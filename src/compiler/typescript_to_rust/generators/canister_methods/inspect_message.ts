import { Rust } from '../../../../types';
import { getCanisterMethodFunctionDeclarationsFromSourceFiles } from '../../../typescript_to_candid/ast_utilities/canister_methods';
import { getFunctionName } from '../../../typescript_to_candid/ast_utilities/miscellaneous';

import * as tsc from 'typescript';

export function generateCanisterMethodInspectMessage(
    sourceFiles: readonly tsc.SourceFile[]
): Rust {
    const inspectMessageFunctionDeclarations =
        getCanisterMethodFunctionDeclarationsFromSourceFiles(sourceFiles, [
            'InspectMessage'
        ]);

    if (inspectMessageFunctionDeclarations.length > 1) {
        throw new Error(`Only one InspectMessage function can be defined`);
    }

    const inspectMessageFunctionDeclaration:
        | tsc.FunctionDeclaration
        | undefined = inspectMessageFunctionDeclarations[0];

    if (inspectMessageFunctionDeclaration === undefined) {
        return '';
    }

    const inspectMessageFunctionName = getFunctionName(
        inspectMessageFunctionDeclaration
    );

    // TODO study deeply what is going on here...I wonder if init and inspectMessage might be writing over each other
    // TODO I probably did not need to do all of the weird pyramid stuff, unless the shared mutable state is actually an issue
    // TODO I am hoping that it isn't though, as I hope that each update call is executed independently
    // TODO we will have to see though
    return /* rust */ `
        #[ic_cdk_macros::inspect_message]
        fn _azle_${inspectMessageFunctionName}() {
            unsafe {
                ic_cdk::spawn(async {
                    let boa_context_option = BOA_CONTEXT_OPTION.as_mut();

                    if let Some(boa_context) = boa_context_option {
                        let exports_js_value_result = boa_context.eval("exports");

                        if let Ok(exports_js_value) = exports_js_value_result {
                            let exports_js_object_option = exports_js_value.as_object();

                            if let Some(exports_js_object) = exports_js_object_option {
                                let ${inspectMessageFunctionName}_js_value_result =
                                    exports_js_object.get("${inspectMessageFunctionName}", boa_context);

                                if let Ok(${inspectMessageFunctionName}_js_value) =
                                    ${inspectMessageFunctionName}_js_value_result
                                {
                                    let ${inspectMessageFunctionName}_js_object_option =
                                        ${inspectMessageFunctionName}_js_value.as_object();

                                    if let Some(${inspectMessageFunctionName}_js_object) =
                                        ${inspectMessageFunctionName}_js_object_option
                                    {
                                        let return_value_result = ${inspectMessageFunctionName}_js_object
                                            .call(&boa_engine::JsValue::Null, &[], boa_context);

                                        if let Ok(return_value) = return_value_result {
                                            if return_value.is_object() == true
                                                && return_value.as_object().unwrap().is_generator() == true
                                            {
                                                handle_generator_result(boa_context, &return_value).await;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                });
            }
        }
    `;
}

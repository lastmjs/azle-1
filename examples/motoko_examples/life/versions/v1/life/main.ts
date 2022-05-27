import * as Grid from './grid';
import * as Random from './random';
import * as State from './state';
import { ic, PostUpgrade, PreUpgrade, Query, Stable, Update } from 'azle';

type StableStorage = Stable<{
    state: State.State;
}>;

let stableStorage = ic.stableStorage<StableStorage>();

stableStorage.state ??= (() => {
    const rand = Random.create();
    return State.create(64, () => rand.next() % 2 === 1);
})();

export function preUpgrade(): PreUpgrade {
    stableStorage.state = cur.toState();
}

export function postUpgrade(): PostUpgrade {
    console.log('upgraded to v1!');
}

export function stableState(): Query<string> {
    return JSON.stringify(cur.toState());
}

let cur = Grid.grid(stableStorage.state);
let nxt = Grid.grid(State.create(cur.size(), () => false));

export function next(): Update<string> {
    cur.next(nxt);
    const temp = cur;
    cur = nxt;
    nxt = temp;
    return cur.toText();
}

export function current(): Query<string> {
    return cur.toText();
}

export type TStop = {
    line: number,
    stop: string,
    order: number,
    time: string
}

export type TLineStopsMap = Map<number, TStop[]>;

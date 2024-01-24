import { apiService } from "@/services/api.service";
import {TLineStopsMap, TStop} from "@/types/timetable";
import { Commit } from "vuex";

type TState = {
    stops: TStop[];
    lines: number[];
    lineStopsMap: TLineStopsMap;
    selectedLine: string | null;
    selectedStop: TStop | null;
}

export const TimeTableStoreModule = {
    state: {
        stops: [],
        lines: [],
        lineStopsMap: new Map(),
        selectedLine: null,
        selectedStop: null,
    },
    getters: {
        getStops: (state: TState) => () => {
            return state.stops;
        },

        getLines: (state: TState) => () => {
            return state.lines;
        },

        getStopsByLine: (state: TState) => (line: number) => {
            return state.lineStopsMap.get(line) ?? [];
        }
    },
    mutations: {
        setStops(state: TState, stops: TStop[]) {
            state.stops = stops;
        },

        setLines(state: TState, lines: number[]) {
            state.lines = lines;
        },

        setLineStopsMap(state: TState, stops: TStop[]) {
            const lineStopsMap: TLineStopsMap = new Map();

            for (const stop of stops)  {
                if (!lineStopsMap.has(stop.line)) {
                    lineStopsMap.set(stop.line, []);
                }

                lineStopsMap.get(stop.line)?.push(stop);
            }

            state.lineStopsMap = lineStopsMap;
        }
    },
    actions: {
        async fetchTimetableData({ commit, state }: {commit: Commit, state: TState}, forceUpdate = false) {
            if (state.stops.length > 0 && !forceUpdate) {
                return;
            }

            const { stops, lines} = await apiService.fetchTimetableData();

            stops.sort((a, b) => a.order - b.order);
            lines.sort((a, b) => a - b);

            commit('setStops', stops);
            commit('setLines', lines);

            commit('setLineStopsMap', stops);
        },

    }
};

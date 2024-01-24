import axios from 'axios';
import {TStop} from "@/types/timetable";

interface Response {
    data: TStop[]
}

class ApiService {
    #api = axios.create({
        baseURL: 'http://localhost:3000'
    });

    #responseToDTO = (response: Response): { stops: TStop[], lines: number[] } => {
        const stops: TStop[] = response.data;
        const lines = new Set<number>();

        for (const stop of stops) {
            lines.add(stop.line);
        }

        return {stops, lines: Array.from(lines)};
    }

    async fetchTimetableData() {
        const stops = await this.#api.get('/stops');

        return this.#responseToDTO(stops);
    }
}

export const apiService = new ApiService();
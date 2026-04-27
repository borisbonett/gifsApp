import { HttpClient } from "@angular/common/http";
import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import type { GiphyItem, Giphyresponse } from "../interfaces/giphy.interfaces";
import { Gif } from "../interfaces/gif.interface";
import { GifMapper } from "../mapper/gif.mapper";
import { map, Observable, tap } from "rxjs";


const GIF_KEY = 'gifs';

const loadFromLocalStorage = () => {
    const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}';
    const gifs = JSON.parse(gifsFromLocalStorage);
    return gifs;
}

@Injectable({ providedIn: "root" })
export class GifsService {

    private http = inject(HttpClient);

    trendingGifs = signal<Gif[]>([]);
    trendingGifsLoading = signal<boolean>(true);

    searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
    searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

    constructor() {
        this.loadTrendingGifs();
    }

    saveGifsToLocalStorage = effect(() => {
        const historySting = JSON.stringify(this.searchHistory());
        localStorage.setItem(GIF_KEY, historySting);
    })

    loadTrendingGifs() {
        this.http.get<Giphyresponse>(`${environment.giphyUrl}/gifs/trending`, {
            params: {
                api_key: environment.giphyApiKey,
                limit: 20
            }
        }).subscribe((resp) => {
            const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
            this.trendingGifs.set(gifs);
            this.trendingGifsLoading.set(false);
        })
    }

    searchGifs(query: string): Observable<Gif[]> {

        return this.http.get<Giphyresponse>(`${environment.giphyUrl}/gifs/search`, {
            params: {
                api_key: environment.giphyApiKey,
                limit: 20,
                q: query
            }
        }).pipe(
            map(({ data }) => data),
            map((items) => GifMapper.mapGiphyItemsToGifArray(items)),
            tap(items => {
                this.searchHistory.update(history => ({
                    ...history,
                    [query.toLocaleLowerCase()]: items
                }));
            })
        );
    }

    getHistoyGifs(query: string): Gif[] {
        return this.searchHistory()[query.toLocaleLowerCase()] ?? [];
    }
}

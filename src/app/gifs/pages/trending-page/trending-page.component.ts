import { Component, computed, inject, signal } from "@angular/core";
import { GifsListComponent } from "../../components/side-menu/gifs-list/gifs-list.component";
import { GifsService } from "../../services/gifs.service";


@Component({    selector: "app-trending-page",
    templateUrl: "./trending-page.component.html",
    imports: [GifsListComponent],
})
export default class TrendingPageComponent {

    gifService = inject(GifsService);
    

}
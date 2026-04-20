import { Component, input } from "@angular/core";

@Component({
    selector: "app-gifs-list-item",
    templateUrl: "./gifs-list-item.component.html",
})
export class GifsListItemComponent {
    imageUrl = input.required<string>();
}
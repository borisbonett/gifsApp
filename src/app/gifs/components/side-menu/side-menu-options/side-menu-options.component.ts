import { Component, inject } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { GifsService } from "../../../services/gifs.service";

interface MenuOption {
    icon: string;
    label: string;
    route: string;
    subLabel: string;
}

@Component({
    selector: "app-side-menu-options",
    templateUrl: "./side-menu-options.component.html",
    imports: [RouterLink, RouterLinkActive],
})
export default class SideMenuOptionsComponent {

    gifService = inject(GifsService);

    menuOptions: MenuOption[] = [
        {
            icon: 'fa-solid fa-chart-line',
            label: 'Trending',
            subLabel: 'Gifs Populares',
            route: '/dashboard/trending'
        },
        {
            icon: 'fa-solid fa-magnifying-glass',
            label: 'Buscador',
            subLabel: 'Buscar Gifs',
            route: '/dashboard/search'
        }
    ]

}
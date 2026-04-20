import { Component } from "@angular/core";
import SideMenuHeaderComponent from "./side-menu-header/side-menu-header.component";
import SideMenuOptionsComponent from "./side-menu-options/side-menu-options.component";

@Component({    selector: "app-side-menu",
    templateUrl: "./side-menu.component.html",
    imports: [SideMenuHeaderComponent, SideMenuOptionsComponent],
})
export default class SideMenuComponent {

}
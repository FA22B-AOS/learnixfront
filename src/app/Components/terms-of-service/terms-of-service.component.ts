import {Component, HostListener} from '@angular/core';
import {HeaderComponent} from "../landingpage/Content/header/header.component";
import {FooterComponent} from "../landingpage/Content/footer/footer.component";
import {ScrollService} from "../../Services/scroll.service";

@Component({
  selector: 'app-terms-of-service',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './terms-of-service.component.html',
  styleUrl: './terms-of-service.component.css'
})
export class TermsOfServiceComponent {

  constructor(private scrollService: ScrollService) {
  }

  ngOnInit() {
    this.scrollService.headerScrolled();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrollService.headerScrolled();
    this.scrollService.toggleBackToTop();
  }

  scrollTo(el: string) {
    this.scrollService.scrollToElement(el);
  }
}

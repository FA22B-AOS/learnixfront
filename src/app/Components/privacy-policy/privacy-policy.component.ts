import {Component, HostListener} from '@angular/core';
import {HeaderComponent} from "../landingpage/Content/header/header.component";
import {FooterComponent} from "../landingpage/Content/footer/footer.component";
import {ScrollService} from "../../Services/scroll.service";

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.css'
})
export class PrivacyPolicyComponent {

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

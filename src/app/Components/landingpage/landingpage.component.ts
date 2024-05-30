import {Component, HostListener} from '@angular/core';
import {HttpService} from "../../Services/http.service";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {RouterLink} from "@angular/router";
import {HeroComponent} from "./Content/hero/hero.component";
import {HeaderComponent} from "./Content/header/header.component";
import {AboutComponent} from "./Content/about/about.component";
import {TeamComponent} from "./Content/team/team.component";
import {FooterComponent} from "./Content/footer/footer.component";
import {ContactComponent} from "./Content/contact/contact.component";
import {PricingComponent} from "./Content/pricing/pricing.component";
import {SubscribeComponent} from "./Content/subscribe/subscribe.component";
import {FaqComponent} from "./Content/faq/faq.component";
import {SupportersComponent} from "./Content/supporters/supporters.component";
import {GalleryComponent} from "./Content/gallery/gallery.component";
import {RoadmapComponent} from "./Content/roadmap/roadmap.component";
import {ScrollService} from "../../Services/scroll.service";

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink, HeroComponent, HeaderComponent, AboutComponent, TeamComponent, FooterComponent, ContactComponent, PricingComponent, SubscribeComponent, FaqComponent, SupportersComponent, GalleryComponent, RoadmapComponent],
  providers: [HttpService],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css'
})
export class LandingpageComponent {

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

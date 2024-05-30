import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  constructor() {}

  scrollToElement(el: string) {
    const header = document.querySelector('#header') as HTMLElement;
    let offset = header.offsetHeight;

    if (!header.classList.contains('header-scrolled')) {
      offset -= 20;
    }

    const element = document.querySelector(el) as HTMLElement;
    const elementPos = element.offsetTop;

    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    });
  }

  headerScrolled() {
    const header = document.querySelector('#header') as HTMLElement;

    if (window.scrollY > 100) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  }

  toggleBackToTop() {
    const backToTop = document.querySelector('.back-to-top') as HTMLElement;

    if (window.scrollY > 100) {
      backToTop.classList.add('active');
    } else {
      backToTop.classList.remove('active');
    }
  }
}

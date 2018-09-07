import { AfterViewInit, Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[autosize]'
})
export class AutosizeDirective implements AfterViewInit {

    constructor(private element: ElementRef) { }

    public ngAfterViewInit() {
        this.resize();
    }

    @HostListener('input')
    private resize() {
        const textarea = this.element.nativeElement as HTMLTextAreaElement;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    }
}
import {ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'video-component',
  standalone: true,
  templateUrl: './video.component.html',
  imports: [],
  styleUrls: ['./video.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoComponent {
  @ViewChild('content', { static: false }) contentElement!: ElementRef<HTMLVideoElement>;

  @Input() src: string = '';
  @Output() emitter = new EventEmitter();

  contentReady() {
    const contentHtmlElement = this.contentElement.nativeElement;
    this.emitter.emit({
      event: 'VideoComponent:CONTENT_READY',
      data: {contentHtmlElement},
    });
  }
}

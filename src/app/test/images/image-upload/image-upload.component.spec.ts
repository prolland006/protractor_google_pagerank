
import { ImageUploadComponent } from '../../../images/image-upload/image-upload.component';
import { TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { ImageModule } from '../../../images/image.module';
import { BaseRequestOptions, Http, RequestMethod, ResponseOptions, Response } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

describe('Image Upload', () => {

  beforeEach(() => {
    this.FileReaderBackup = window['FileReader'];
  });

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        ImageModule
      ],
      providers: [
        BaseRequestOptions,
        MockBackend,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        },
        {
          provide: ActivatedRoute,
          useValue: { }
        }
      ]
    }).compileComponents();

  }));

  afterEach(() => {
    window['FileReader'] = this.FileReaderBackup;
  });

  it('should trigger handle input change', fakeAsync(inject([ActivatedRoute], (activatedRoute) => {

    let fixture = TestBed.createComponent(ImageUploadComponent);

    activatedRoute.params = Observable.from([{
      userId: '42'
    }]);

    let inputElement = fixture.debugElement.nativeElement.querySelector('input[name="file"]');

    spyOn(fixture.componentInstance, 'handleInputChange');

    inputElement.dispatchEvent(new Event('change'));

    expect((<jasmine.Spy>fixture.componentInstance.handleInputChange).calls.count()).toEqual(1);


  })));

  it('should upload image',
    fakeAsync(inject([MockBackend, ActivatedRoute], (backend, activatedRoute) => {

    let event;
    let file = {
      name: 'IMAGE_TITLE.jpg',
      size: 5466,
      type: 'image/jpeg'
    };
    let fixture;
    let connectionCountSpy;
    let readAsDataUrlSpy;

    activatedRoute.params = Observable.from([{
      userId: '42'
    }]);

    connectionCountSpy = jasmine.createSpy('connectionCount');

    /* Mock FileReader. */
    readAsDataUrlSpy = jasmine.createSpy('readAsDataURL');

    class FakeFileReader {
      readAsDataURL = readAsDataUrlSpy;
    }

    window['FileReader'] = FakeFileReader;

    readAsDataUrlSpy.and.callFake(function () {
      this.onload({
        target: {
          result: 'data:image/png;base64,IMAGE_DATA'
        }
      });
    });

    /* Mock backend. */
    backend.connections.subscribe(connection => {

      connectionCountSpy();

      expect(connection.request.method).toEqual(RequestMethod.Post);
      expect(connection.request.url).toEqual('/users/42/images');
      expect(connection.request.json()).toEqual({
        imageData: 'data:image/png;base64,IMAGE_DATA',
        title: 'IMAGE_TITLE.jpg'
      });

      connection.mockRespond(new Response(new ResponseOptions({body: {
        id: 'IMAGE_ID',
        title: null,
        url: '/uploads/IMAGE_ID.jpg'
      }})));

    });

    fixture = TestBed.createComponent(ImageUploadComponent);

    fixture.detectChanges();
    event = {
      target: {
        files: [file]
      }
    };
    fixture.componentInstance.handleInputChange(event);

    tick();

    expect(readAsDataUrlSpy.calls.count()).toEqual(1);
    expect(connectionCountSpy.calls.count()).toEqual(1);

  })));

});

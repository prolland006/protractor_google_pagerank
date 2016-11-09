import { TestBed, async, fakeAsync, inject, tick } from '@angular/core/testing';
import { ImageModule } from '../../../images/image.module';
import { ImageStore } from '../../../images/image-store/image-store';
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

describe('ImageStore', () => {

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
        }
      ]
    }).compileComponents();

  }));

  it('should return image list Observable',
      fakeAsync(inject([ImageStore, MockBackend], (imageStore, mockBackend) => {

    let imageList;

    mockBackend.connections.subscribe(connection => {
      expect(connection.request.method).toEqual(RequestMethod.Get);
      expect(connection.request.url).toEqual('/users/42/images');
      connection.mockRespond(new Response(new ResponseOptions({body: [
        {
          url: '/images/111111.jpg'
        },
        {
          url: '/images/222222.jpg'
        }
      ]})));
    });

    /* Run. */
    let imagesObservable = imageStore.getImagesFromUser('42');

    /* Test. */
    imagesObservable.subscribe(_imageList => imageList = _imageList);

    tick();

    expect(imageList.length).toEqual(2);
    expect(imageList[0].url).toEqual('/images/111111.jpg');
    expect(imageList[1].url).toEqual('/images/222222.jpg');

  })));

});

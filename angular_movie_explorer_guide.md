# 📘 Angular Movie Explorer — Hướng Dẫn Học Toàn Diện

> [!NOTE]
> Toàn bộ code được trích dẫn trong tài liệu này là code **thật** từ project hiện tại. Không có ví dụ bịa đặt trừ khi được đánh dấu rõ ràng.

---

## 🔍 KIỂM TRA THỰC TẾ: Những khái niệm nào ĐÃ được triển khai?

| Khái niệm | Có trong project? | Nơi triển khai |
|---|---|---|
| Standalone components | ✅ Có | Mọi component đều standalone |
| Routing | ✅ Có | [app.routes.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/app.routes.ts) |
| RouterOutlet | ✅ Có | [app.html](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/app.html) |
| RouterLink / RouterLinkActive | ✅ Có | [navbar.html](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/components/navbar/navbar.html) |
| Route parameters | ✅ Có | [movie-detail-page.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/pages/movie-detail/movie-detail-page.ts) `:id` |
| Reusable components | ✅ Có | MovieCardComponent, MovieGridComponent, HeroComponent, SearchBarComponent, DisplaySettingsComponent |
| Parent-child communication | ✅ Có | MovieGrid → MovieCard, SettingsPage → DisplaySettings |
| input() / output() | ✅ Có | Dùng API signal-based (`input()`, `output()`) |
| Services | ✅ Có | MovieService, FavoritesService, DisplayConfigService |
| Dependency Injection | ✅ Có | `inject()` function |
| Signals | ✅ Có | `signal()` trong services & pages |
| computed() | ✅ Có | Nhiều nơi trong pages & services |
| Reactive Forms | ✅ Có | [search-bar.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/components/search-bar/search-bar.ts) |
| HttpClient architecture | ✅ Có | [movie.service.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/services/movie.service.ts) |
| Loading/error states | ✅ Có | [movie-grid.html](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/components/movie-grid/movie-grid.html), [movie-detail-page.html](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/pages/movie-detail/movie-detail-page.html) |
| Lazy loading | ✅ Có | `loadComponent` trong routes |
| Route guards | ✅ Có | [valid-movie-id.guard.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/guards/valid-movie-id.guard.ts) |
| Interceptor | ✅ Có | [movie-api.interceptor.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/interceptors/movie-api.interceptor.ts) |
| localStorage | ✅ Có | FavoritesService, DisplayConfigService |
| Configurable show/hide blocks | ✅ Có | DisplayConfig + `@if` trên HomePage |
| @if | ✅ Có | Nhiều template |
| @for | ✅ Có | movie-grid.html, search-bar.html, movies-page.html |
| Favorites | ✅ Có | FavoritesService + FavoritesPage |
| Settings | ✅ Có | SettingsPage + DisplaySettingsComponent |
| **Mock authentication** | ❌ **KHÔNG CÓ** | Không có AuthService, LoginPage, hay auth guard |
| **Two-way binding** | ❌ **KHÔNG CÓ** | Project dùng Reactive Forms, không dùng `[(ngModel)]` |
| **effect()** | ❌ **KHÔNG CÓ** | Không file nào sử dụng `effect()` |

> [!IMPORTANT]
> **Mock authentication** và **LoginPageComponent** được liệt kê trong mô tả ban đầu nhưng **KHÔNG tồn tại** trong codebase hiện tại. Tài liệu này sẽ không giả vờ giải thích chúng.

---

## PART 1 — ANGULAR LÀ GÌ? (Tổng quan cấp cao)

### Angular là gì?

Angular là một **framework** (khung phát triển) để xây dựng ứng dụng web, được phát triển bởi Google. Nó cung cấp một bộ quy tắc và công cụ hoàn chỉnh để bạn tổ chức code theo cách có cấu trúc, bảo trì được.

### Angular giải quyết vấn đề gì?

Khi bạn viết web bằng HTML/CSS/JavaScript thuần, bạn phải **tự làm mọi thứ**:

- Tự tìm element trong DOM bằng `document.getElementById()`
- Tự cập nhật nội dung khi data thay đổi
- Tự quản lý trạng thái (biến nào lưu ở đâu?)
- Tự tổ chức code (file nào chứa gì?)
- Tự xử lý routing (người dùng vào URL nào thì hiện gì?)

Với một trang web nhỏ, điều này chấp nhận được. Nhưng khi ứng dụng có **nhiều trang, nhiều trạng thái, nhiều tương tác** — code nhanh chóng trở nên hỗn loạn.

**Angular giải quyết bằng cách** cung cấp:
- **Components** → chia nhỏ UI thành các khối độc lập
- **Templates** → HTML thông minh tự cập nhật khi data thay đổi
- **Services** → logic dùng chung, không bị lặp lại
- **Routing** → điều hướng giữa các trang mà không reload
- **Dependency Injection** → Angular tự tạo và quản lý service

### Vì sao dùng Angular thay vì JavaScript thuần?

Với JavaScript thuần, để hiển thị danh sách 36 phim như project này, bạn phải:

```javascript
// JavaScript thuần (KHÔNG PHẢI code trong project)
const container = document.getElementById('movie-list');
movies.forEach(movie => {
  const div = document.createElement('div');
  div.innerHTML = `<h3>${movie.title}</h3><p>${movie.year}</p>`;
  container.appendChild(div);
});
```

Mỗi khi data thay đổi (ví dụ: filter, sort, thêm favorite), bạn phải **xóa DOM cũ, tạo lại DOM mới**. Angular tự động làm điều này.

### Vai trò của TypeScript

TypeScript là **ngôn ngữ lập trình**, là phiên bản mở rộng của JavaScript có thêm **kiểu dữ liệu** (types).

Ví dụ thực tế từ project — [models/movie.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/models/movie.ts):

```typescript
export interface Movie {
  id: number;
  title: string;
  year: number;
  genre: MovieGenre;
  rating: number;
  description: string;
  posterUrl: string;
  director: string;
  duration: string;
}
```

`interface` là tính năng của **TypeScript**, không phải Angular. Nó cho phép bạn **mô tả hình dạng** của dữ liệu. Khi bạn viết `movie.titl` (thiếu chữ `e`), TypeScript sẽ báo lỗi ngay lập tức, không cần chạy thử.

### Vai trò của Templates

Template là file HTML của component, nhưng có thêm cú pháp đặc biệt của Angular (`{{ }}`, `@if`, `@for`, `[property]`, `(event)`). Template là **giao diện** — cái người dùng nhìn thấy.

### Vai trò của Components

Component là **đơn vị cơ bản** của Angular. Mỗi component = **logic (TypeScript) + giao diện (HTML template) + style (CSS)**.

### Angular cập nhật UI khi state thay đổi như thế nào?

Trong project này, Angular dùng **Signals**. Khi giá trị của signal thay đổi, Angular tự biết template nào cần cập nhật → tự render lại phần đó.

### Luồng dữ liệu tổng quát

```
Người dùng (click, gõ, điều hướng)
        ↓
    Component (xử lý sự kiện)
        ↓
    Service (logic nghiệp vụ + trạng thái)
        ↓
    Signal thay đổi
        ↓
    Template tự cập nhật
        ↓
    Giao diện hiển thị mới
```

### Áp dụng vào Movie Explorer

```
Người dùng click nút "Save" trên MovieCard
        ↓
    MovieCardComponent.toggleFavorite() → emit event
        ↓
    Parent (MoviesPage) gọi FavoritesService.toggleFavorite()
        ↓
    FavoritesService signal (favoriteIdsState) thay đổi
        ↓
    computed (favoriteCount) tự tính lại
        ↓
    Navbar template hiển thị số mới: "Favorites (3)"
    MovieCard template hiển thị nút "Saved" thay vì "Save"
```

---

## PART 2 — KIẾN TRÚC PROJECT THỰC TẾ

### Cây thư mục chính

```
src/
├── main.ts                          ← Điểm khởi chạy
├── index.html                       ← HTML duy nhất, chứa <app-root>
├── styles.css                       ← CSS toàn cục
├── environments/
│   ├── environment.ts               ← Cấu hình dev
│   ├── environment.prod.ts          ← Cấu hình production
│   └── movie-api-config.ts          ← Type cho data source
└── app/
    ├── app.ts                       ← AppComponent (root)
    ├── app.html                     ← Template root
    ├── app.css                      ← Style root
    ├── app.config.ts                ← Cấu hình ứng dụng
    ├── app.routes.ts                ← Định tuyến
    ├── models/
    │   ├── movie.ts                 ← Interface Movie
    │   └── display-config.ts        ← Interface DisplayConfig
    ├── data/
    │   └── movies.ts                ← Dữ liệu phim mock
    ├── services/
    │   ├── movie.service.ts         ← Quản lý dữ liệu phim
    │   ├── favorites.service.ts     ← Quản lý favorites
    │   └── display-config.service.ts← Quản lý cấu hình hiển thị
    ├── guards/
    │   └── valid-movie-id.guard.ts  ← Kiểm tra URL hợp lệ
    ├── interceptors/
    │   └── movie-api.interceptor.ts ← Thêm header/timeout cho HTTP
    ├── components/                  ← Reusable components
    │   ├── navbar/
    │   ├── hero/
    │   ├── movie-card/
    │   ├── movie-grid/
    │   ├── search-bar/
    │   └── display-settings/
    └── pages/                       ← Page components
        ├── home/
        ├── movies/
        ├── movie-detail/
        ├── favorites/
        └── settings/
```

### Cây component thực tế

```
AppComponent
│
├── NavbarComponent                (luôn hiển thị)
│
└── <router-outlet>                (thay đổi theo URL)
    │
    ├── HomePageComponent          (path: '')
    │   ├── HeroComponent          (nếu config.hero = true)
    │   └── MovieGridComponent ×3  (nếu config cho từng block = true)
    │       └── MovieCardComponent ×N
    │
    ├── MoviesPageComponent        (path: 'movies')
    │   ├── SearchBarComponent
    │   └── MovieGridComponent
    │       └── MovieCardComponent ×N
    │
    ├── MovieDetailPageComponent   (path: 'movies/:id')
    │
    ├── FavoritesPageComponent     (path: 'favorites')
    │   └── MovieGridComponent
    │       └── MovieCardComponent ×N
    │
    └── SettingsPageComponent      (path: 'settings')
        └── DisplaySettingsComponent
```

### Trách nhiệm của từng lớp

**AppComponent** — "Vỏ bọc" nhẹ nhất có thể:
- Chỉ hiển thị Navbar + `<router-outlet>`
- Không chứa logic nghiệp vụ
- Không chứa trạng thái

**Tại sao không nên đặt mọi thứ vào AppComponent?** Vì nếu AppComponent chứa cả navbar, hero, danh sách phim, form search, settings... thì file sẽ dài hàng nghìn dòng, mọi thay đổi đều ảnh hưởng lẫn nhau, và bạn không thể tái sử dụng bất kỳ phần nào.

**Pages** — Mỗi page là "đạo diễn" cho một trang:
- Inject services cần thiết
- Tổ chức reusable components
- Xử lý sự kiện từ components con

**Reusable components** — "Viên gạch" dùng đi dùng lại:
- MovieCardComponent hiển thị 1 thẻ phim → dùng ở trang Home, Movies, Favorites
- MovieGridComponent hiển thị lưới phim → dùng ở Home, Movies, Favorites
- Nhận dữ liệu qua `input()`, phát sự kiện qua `output()`

**Services** — Logic dùng chung:
- MovieService: lấy dữ liệu phim
- FavoritesService: quản lý danh sách yêu thích
- DisplayConfigService: quản lý cấu hình hiển thị

---

## PART 3 — COMPONENTS (Chi tiết)

### Component = Logic + Template + Styles

Mỗi Angular component gồm **3 file** (trong project này):
- `.ts` — TypeScript class chứa logic và state
- `.html` — Template hiển thị UI
- `.css` — Style riêng cho component

### 3.1 AppComponent — Root Component

📄 [app.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/app.ts):

```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {}
```

Giải thích từng phần:

- **`@Component({...})`** — Đây là **decorator** (tính năng TypeScript). Nó "đánh dấu" cho Angular biết: "class này là một Component". Không có decorator này, Angular không biết đây là component.

- **`selector: 'app-root'`** — Tên HTML tag tùy chỉnh. Khi Angular thấy `<app-root></app-root>` trong [index.html](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/index.html), nó sẽ thay thế bằng nội dung của AppComponent.

- **`imports: [NavbarComponent, RouterOutlet]`** — Danh sách các component/directive mà template cần dùng. Vì project dùng **standalone components** (không có NgModule), mỗi component phải tự khai báo dependencies.

- **`templateUrl: './app.html'`** — Đường dẫn đến file template.

- **`styleUrl: './app.css'`** — Đường dẫn đến file CSS. CSS này **chỉ áp dụng cho component này** (view encapsulation).

- **`export class AppComponent {}`** — Class rỗng! Root component trong project này không chứa bất kỳ logic nào. Nó chỉ là "khung" để chứa Navbar và `router-outlet`.

📄 [app.html](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/app.html):

```html
<app-navbar />

<main class="app-main">
  <!-- ANGULAR LEARNING: RouterOutlet renders the active route component. -->
  <router-outlet />
</main>
```

- `<app-navbar />` — Angular thay bằng NavbarComponent
- `<router-outlet />` — Angular thay bằng component tương ứng với URL hiện tại

### 3.2 MovieCardComponent — Reusable Component

📄 [movie-card.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/components/movie-card/movie-card.ts):

```typescript
import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movie-card',
  imports: [RouterLink],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css'
})
export class MovieCardComponent {
  readonly movie = input.required<Movie>();
  readonly isFavorite = input(false);
  readonly favoriteToggled = output<number>();

  toggleFavorite(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.favoriteToggled.emit(this.movie().id);
  }

  useFallbackPoster(event: Event): void {
    const image = event.target as HTMLImageElement;
    image.src = 'https://placehold.co/640x420/111827/f8fafc?text=Movie';
  }
}
```

Giải thích:

- **`input.required<Movie>()`** — Tạo một **input signal** bắt buộc. Parent **phải** truyền data cho `[movie]`. Gọi `this.movie()` (có ngoặc) để đọc giá trị.

- **`input(false)`** — Input tùy chọn với giá trị mặc định `false`. Nếu parent không truyền `[isFavorite]`, giá trị sẽ là `false`.

- **`output<number>()`** — Tạo một **output event**. Khi user click "Save", component emit `movieId` lên parent.

- **`toggleFavorite(event)`** — Method xử lý click. `event.preventDefault()` ngăn link `<a>` điều hướng, `event.stopPropagation()` ngăn event lan lên parent. Sau đó emit id lên parent.

- **`useFallbackPoster(event)`** — Khi ảnh lỗi, thay bằng ảnh placeholder. Đây là xử lý thuần DOM (browser API), không phải Angular concept.

📄 [movie-card.html](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/components/movie-card/movie-card.html):

```html
<article class="movie-card">
  <a class="poster-link" [routerLink]="['/movies', movie().id]" [attr.aria-label]="'View details for ' + movie().title">
    <img class="poster" [src]="movie().posterUrl" [alt]="movie().title + ' poster'" (error)="useFallbackPoster($event)" />
  </a>

  <div class="movie-info">
    <h3>{{ movie().title }}</h3>
    <p class="meta">{{ movie().year }} | {{ movie().genre }}</p>
    <p class="rating" aria-label="Rating {{ movie().rating }} out of 10">Star {{ movie().rating }}/10</p>
    <p class="description">{{ movie().description }}</p>

    <div class="card-actions">
      <a class="details-link" [routerLink]="['/movies', movie().id]">View details</a>
      <button
        type="button"
        class="favorite-button"
        [class.saved]="isFavorite()"
        (click)="toggleFavorite($event)"
        [attr.aria-label]="isFavorite() ? 'Remove ' + movie().title + ' from favorites' : 'Add ' + movie().title + ' to favorites'"
      >
        {{ isFavorite() ? 'Saved' : 'Save' }}
      </button>
    </div>
  </div>
</article>
```

Nhận xét: Template này chứa **mọi loại data binding** (xem Part 4).

### 3.3 MovieGridComponent — Component trung gian

📄 [movie-grid.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/components/movie-grid/movie-grid.ts):

```typescript
@Component({
  selector: 'app-movie-grid',
  imports: [MovieCardComponent],
  templateUrl: './movie-grid.html',
  styleUrl: './movie-grid.css'
})
export class MovieGridComponent {
  readonly title = input('');
  readonly movies = input.required<Movie[]>();
  readonly favoriteIds = input<number[]>([]);
  readonly emptyMessage = input('No movies found.');
  readonly isLoading = input(false);
  readonly errorMessage = input<string | null>(null);
  readonly favoriteToggled = output<number>();

  isFavorite(movieId: number): boolean {
    return this.favoriteIds().includes(movieId);
  }
}
```

Đây là **component trung gian**: nhận danh sách phim từ parent (Page), rồi tạo nhiều MovieCardComponent con. Nó có 6 inputs (nhiều có giá trị mặc định) và 1 output.

### 3.4 NavbarComponent — Component với Service

📄 [navbar.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/components/navbar/navbar.ts):

```typescript
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {
  protected readonly favoritesService = inject(FavoritesService);
}
```

Navbar inject `FavoritesService` trực tiếp để hiển thị số lượng favorites trong badge. Nó dùng `inject()` thay vì nhận qua `input()` vì Navbar **không phải con** của bất kỳ page nào — nó nằm ngoài `<router-outlet>`.

### 3.5 SearchBarComponent — Component với Reactive Forms

📄 [search-bar.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/components/search-bar/search-bar.ts):

```typescript
@Component({
  selector: 'app-search-bar',
  imports: [ReactiveFormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css'
})
export class SearchBarComponent implements OnInit {
  readonly filtersChanged = output<SearchFilters>();
  protected readonly genres = ['All', ...MOVIE_GENRES];

  protected readonly filtersForm = new FormGroup({
    searchText: new FormControl('', { nonNullable: true }),
    genre: new FormControl<MovieGenre | 'All'>('All', { nonNullable: true }),
    sort: new FormControl<MovieSort>('rating-desc', { nonNullable: true }),
  });

  ngOnInit(): void {
    this.emitFilters();
    this.filtersForm.valueChanges.subscribe(() => this.emitFilters());
  }

  clearSearch(): void {
    this.filtersForm.patchValue({ searchText: '', genre: 'All', sort: 'rating-desc' });
  }

  private emitFilters(): void {
    const value = this.filtersForm.getRawValue();
    this.filtersChanged.emit(value);
  }
}
```

Đây là component phức tạp nhất — dùng Reactive Forms (xem Part 12).

### Phân loại Components

| Loại | Ý nghĩa | Ví dụ trong project |
|---|---|---|
| **Root component** | Component gốc, container cho toàn app | AppComponent |
| **Page component** | Component đại diện cho 1 trang, được load bởi Router | HomePageComponent, MoviesPageComponent... |
| **Reusable component** | "Viên gạch" dùng lại ở nhiều nơi | MovieCardComponent, MovieGridComponent |
| **Child component** | Component con được nhúng bởi parent | DisplaySettingsComponent (con của SettingsPage) |

---

## PART 4 — DATA BINDING

Data binding là cách Angular **liên kết dữ liệu** giữa TypeScript class và HTML template.

### 4.1 Interpolation `{{ }}`

**Nó là gì?** Hiển thị giá trị từ TypeScript dưới dạng text trong HTML.

**Hướng dữ liệu:** TypeScript → Template (text)

Ví dụ thực tế từ [movie-card.html](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/components/movie-card/movie-card.html):

```html
<h3>{{ movie().title }}</h3>
<p class="meta">{{ movie().year }} | {{ movie().genre }}</p>
<p class="rating">Star {{ movie().rating }}/10</p>
```

- `movie()` gọi input signal → trả về object Movie
- `.title` truy cập property `title` của object
- Angular **tự động** chuyển giá trị thành string và chèn vào DOM
- Khi giá trị thay đổi, Angular tự cập nhật text — bạn **không cần** gọi `element.textContent = ...`

Ví dụ khác từ [navbar.html](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/components/navbar/navbar.html):

```html
<a routerLink="/favorites" routerLinkActive="active">Favorites ({{ favoritesService.favoriteCount() }})</a>
```

Ở đây `favoritesService.favoriteCount()` gọi **computed signal** — mỗi khi danh sách favorites thay đổi, con số trong ngoặc tự cập nhật.

### 4.2 Property Binding `[property]`

**Nó là gì?** Gán giá trị TypeScript cho property của element DOM hoặc input của component con.

**Hướng dữ liệu:** TypeScript → DOM property / Component input

Ví dụ thực tế từ [movie-card.html](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/components/movie-card/movie-card.html):

```html
<img class="poster" [src]="movie().posterUrl" [alt]="movie().title + ' poster'" />
```

- `[src]="movie().posterUrl"` → gán giá trị `posterUrl` cho property `src` của element `<img>`
- **Ngoặc vuông** `[]` nói với Angular: "đây là biểu thức TypeScript, hãy đánh giá nó"
- Nếu viết `src="movie().posterUrl"` (không có ngoặc vuông), HTML sẽ hiểu đây là string literal `"movie().posterUrl"`, không phải URL thật

Ví dụ binding vào **component input** từ [movie-grid.html](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/components/movie-grid/movie-grid.html):

```html
<app-movie-card
  [movie]="movie"
  [isFavorite]="isFavorite(movie.id)"
  (favoriteToggled)="favoriteToggled.emit($event)"
/>
```

- `[movie]="movie"` → truyền biến `movie` (từ `@for`) vào input `movie` của MovieCardComponent
- `[isFavorite]="isFavorite(movie.id)"` → gọi method `isFavorite()` và truyền kết quả boolean

Ví dụ **class binding** từ [movie-card.html](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/components/movie-card/movie-card.html):

```html
<button class="favorite-button" [class.saved]="isFavorite()">
```

- `[class.saved]="isFavorite()"` → nếu `isFavorite()` trả về `true`, Angular **thêm** class `saved` vào button; nếu `false`, **xóa** class đó

Ví dụ **attribute binding** từ cùng file:

```html
[attr.aria-label]="isFavorite() ? 'Remove ...' : 'Add ...'"
```

- `[attr.aria-label]` → gán giá trị cho HTML attribute `aria-label`

Ví dụ **disabled binding** từ [movies-page.html](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/pages/movies/movies-page.html):

```html
<button (click)="goToPage(currentPage() - 1)" [disabled]="currentPage() === 1">Previous</button>
```

- `[disabled]="currentPage() === 1"` → khi đang ở trang 1, nút Previous bị vô hiệu hóa

### 4.3 Event Binding `(event)`

**Nó là gì?** Lắng nghe sự kiện từ DOM hoặc component con và gọi method TypeScript.

**Hướng dữ liệu:** User event → TypeScript method

Ví dụ từ [movie-card.html](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/components/movie-card/movie-card.html):

```html
<button (click)="toggleFavorite($event)">
```

- `(click)` → Angular lắng nghe event `click` trên button
- `"toggleFavorite($event)"` → khi click xảy ra, gọi method `toggleFavorite` và truyền event object
- `$event` là **biến đặc biệt** của Angular template, đại diện cho event gốc (MouseEvent trong trường hợp này)

Ví dụ từ [search-bar.html](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/components/search-bar/search-bar.html):

```html
<button type="button" (click)="clearSearch()">Clear</button>
```

Ví dụ lắng nghe **event từ component con** — [movies-page.html](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/pages/movies/movies-page.html):

```html
<app-search-bar (filtersChanged)="updateFilters($event)" />
```

- `(filtersChanged)` → lắng nghe output `filtersChanged` của SearchBarComponent
- `$event` ở đây là object `SearchFilters` mà SearchBar emit

Ví dụ lắng nghe **error event** từ [movie-card.html](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/components/movie-card/movie-card.html):

```html
<img [src]="movie().posterUrl" (error)="useFallbackPoster($event)" />
```

- `(error)` → khi ảnh không load được, gọi `useFallbackPoster` để thay ảnh

### 4.4 Two-way Binding

**Project này KHÔNG sử dụng two-way binding (`[(ngModel)]`)**. Thay vào đó, project dùng **Reactive Forms** (xem Part 12), là cách tiếp cận nâng cao hơn để quản lý form input.

---

## PART 5 — @if VÀ @for

### 5.1 @if — Conditional Rendering

**Nó là gì?** Syntax điều kiện trong Angular template. Nếu điều kiện đúng → tạo element trong DOM. Nếu sai → **xóa hoàn toàn** element khỏi DOM (không phải ẩn).

**Vì sao Angular cần nó?** Vì nhiều phần UI chỉ nên hiện khi có data, hoặc chỉ hiện trong trạng thái nhất định (loading, error, empty...).

Ví dụ thực tế từ [home-page.html](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/pages/home/home-page.html):

```html
@if (displayConfigService.displayConfig().hero) {
  <app-hero />
}

@if (displayConfigService.displayConfig().featuredMovies) {
  <app-movie-grid
    title="Featured Movies"
    [movies]="featuredMovies()"
    [favoriteIds]="favoritesService.favoriteIds()"
    [isLoading]="movieService.loading()"
    [errorMessage]="movieService.errorMessage()"
    (favoriteToggled)="toggleFavorite($event)"
  />
}
```

Luồng hoạt động:

```
displayConfigService.displayConfig() → { hero: false, featuredMovies: true, ... }
                                             ↓                    ↓
                                     @if(false) = không render    @if(true) = render
                                     HeroComponent KHÔNG          MovieGridComponent
                                     tồn tại trong DOM            TỒN TẠI trong DOM
```

**@if khác CSS `display:none` thế nào?**

| `@if (false)` | `display: none` |
|---|---|
| Element bị **XÓA** khỏi DOM | Element vẫn **TỒN TẠI** trong DOM, chỉ bị ẩn |
| Component bị **hủy** (destroy) | Component vẫn chạy, vẫn giữ state |
| Không tốn bộ nhớ | Vẫn tốn bộ nhớ |
| Khi điều kiện thành true → component được **tạo mới** | Khi bỏ display:none → component cũ hiện lại |

Ví dụ `@if` với `@else if` và `@else` — từ [movie-grid.html](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/components/movie-grid/movie-grid.html):

```html
@if (isLoading()) {
  <p class="state-message loading" aria-live="polite">Loading movies...</p>
} @else if (movies().length > 0) {
  <div class="movie-grid">
    @for (movie of movies(); track movie.id) {
      <app-movie-card ... />
    }
  </div>
} @else {
  <p class="empty-state">{{ emptyMessage() }}</p>
}
```

Đây là **state machine** cho UI:
1. Nếu đang loading → hiện "Loading movies..."
2. Nếu có data → hiện grid phim
3. Nếu không có data → hiện thông báo rỗng

Chỉ **1 trong 3** trạng thái tồn tại trong DOM tại một thời điểm.

Ví dụ `@if` với `as` — từ [movie-detail-page.html](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/pages/movie-detail/movie-detail-page.html):

```html
} @else if (movie(); as currentMovie) {
  <article class="detail-layout">
    <h1>{{ currentMovie.title }}</h1>
    ...
  </article>
}
```

- `movie()` gọi computed signal → có thể trả về `Movie | undefined`
- `as currentMovie` → nếu kết quả không phải null/undefined, gán vào biến `currentMovie` để dùng trong block
- Điều này vừa kiểm tra "có data không?" vừa tạo biến tiện lợi

### 5.2 @for — List Rendering

**Nó là gì?** Lặp qua một danh sách và tạo element cho từng item.

**Vì sao Angular cần nó?** Vì danh sách là pattern phổ biến nhất trong UI (danh sách phim, genres, trang...).

Ví dụ thực tế từ [movie-grid.html](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/components/movie-grid/movie-grid.html):

```html
@for (movie of movies(); track movie.id) {
  <app-movie-card
    [movie]="movie"
    [isFavorite]="isFavorite(movie.id)"
    (favoriteToggled)="favoriteToggled.emit($event)"
  />
}
```

Giải thích:

- `movie of movies()` → `movies()` gọi input signal trả về `Movie[]`, lặp qua từng `movie`
- **`track movie.id`** → ĐÂY LÀ BẮT BUỘC. Angular dùng `track` để nhận dạng từng item khi danh sách thay đổi.

**Tại sao `track movie.id` quan trọng?**

Giả sử bạn có 36 phim và user filter → còn 10 phim. Angular cần biết phim nào **mới**, phim nào **đã có**, phim nào **bị xóa**. Nhờ `track movie.id`, Angular so sánh bằng `id`:
- id 3, 8, 16 vẫn còn → **giữ nguyên** DOM elements, không tạo lại
- id 1, 2, 4... không còn → **xóa** DOM elements
- Nếu không có `track`, Angular có thể **xóa tất cả và tạo lại tất cả** → lãng phí hiệu năng

Ví dụ khác từ [search-bar.html](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/components/search-bar/search-bar.html):

```html
<select formControlName="genre">
  @for (genre of genres; track genre) {
    <option [value]="genre">{{ genre }}</option>
  }
</select>
```

Ở đây `track genre` dùng chính giá trị string (`'All'`, `'Action'`...) làm identity vì danh sách genres là cố định.

Ví dụ khác từ [movies-page.html](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/pages/movies/movies-page.html):

```html
@for (page of pageNumbers(); track page) {
  <button
    (click)="goToPage(page)"
    [class.active]="page === currentPage()"
  >
    {{ page }}
  </button>
}
```

Render nút phân trang, `track page` dùng số trang (1, 2, 3...) làm identity.

---

## PART 6 — INPUT / OUTPUT VÀ GIAO TIẾP PARENT-CHILD

### Nguyên tắc

```
     Parent (Page / Container)
       │                    ▲
       │ data (input)       │ event (output)
       ▼                    │
     Child (Reusable Component)
```

- **Parent gửi data xuống child** qua `input()`
- **Child gửi event lên parent** qua `output()`
- Child **KHÔNG BAO GIỜ** trực tiếp thay đổi state của parent

### Ví dụ thực tế: MoviesPage → MovieGrid → MovieCard

**Bước 1: MovieCardComponent khai báo input/output**

📄 [movie-card.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/components/movie-card/movie-card.ts):

```typescript
export class MovieCardComponent {
  readonly movie = input.required<Movie>();     // INPUT: nhận object Movie từ parent
  readonly isFavorite = input(false);           // INPUT: nhận boolean, mặc định false
  readonly favoriteToggled = output<number>();  // OUTPUT: phát ra movieId khi user click
}
```

Project này dùng **signal-based API** (`input()`, `output()`) thay vì decorator cũ (`@Input()`, `@Output()`). Cả hai đều hợp lệ, nhưng signal-based là cách mới hơn.

**Bước 2: MovieGridComponent truyền data xuống MovieCard**

📄 [movie-grid.html](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/components/movie-grid/movie-grid.html):

```html
@for (movie of movies(); track movie.id) {
  <app-movie-card
    [movie]="movie"
    [isFavorite]="isFavorite(movie.id)"
    (favoriteToggled)="favoriteToggled.emit($event)"
  />
}
```

- `[movie]="movie"` → property binding gán biến `movie` (từ vòng lặp) vào input `movie` của MovieCard
- `[isFavorite]="isFavorite(movie.id)"` → gọi method, truyền kết quả boolean
- `(favoriteToggled)="favoriteToggled.emit($event)"` → lắng nghe output của child, **chuyển tiếp** event lên parent tiếp theo (MovieGrid cũng có output `favoriteToggled`)

**Bước 3: MoviesPage truyền data xuống MovieGrid và xử lý event**

📄 [movies-page.html](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/pages/movies/movies-page.html):

```html
<app-movie-grid
  [movies]="visibleMovies()"
  [favoriteIds]="favoritesService.favoriteIds()"
  [isLoading]="movieService.loading()"
  [errorMessage]="movieService.errorMessage()"
  emptyMessage="No movies found. Try a different search or filter."
  (favoriteToggled)="toggleFavorite($event)"
/>
```

📄 [movies-page.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/pages/movies/movies-page.ts):

```typescript
toggleFavorite(movieId: number): void {
  this.favoritesService.toggleFavorite(movieId);
}
```

### Toàn bộ luồng data khi user click "Save"

```
User click nút "Save" trên MovieCard
        ↓
MovieCardComponent.toggleFavorite(event)
        ↓
this.favoriteToggled.emit(this.movie().id)   ← emit movieId lên parent
        ↓
MovieGridComponent nhận event qua (favoriteToggled)
        ↓
favoriteToggled.emit($event)                 ← chuyển tiếp lên parent tiếp
        ↓
MoviesPageComponent.toggleFavorite(movieId)
        ↓
this.favoritesService.toggleFavorite(movieId) ← gọi service
        ↓
FavoritesService signal thay đổi
        ↓
Tất cả template đang đọc signal này tự cập nhật
```

### Ví dụ thứ hai: SettingsPage → DisplaySettings

📄 [display-settings.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/components/display-settings/display-settings.ts):

```typescript
export class DisplaySettingsComponent {
  readonly config = input.required<DisplayConfig>();
  readonly settingChanged = output<{ key: keyof DisplayConfig; value: boolean }>();
  readonly resetRequested = output<void>();

  updateSetting(key: keyof DisplayConfig, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.settingChanged.emit({ key, value: checkbox.checked });
  }
}
```

📄 [settings-page.html](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/pages/settings/settings-page.html):

```html
<app-display-settings
  [config]="displayConfigService.displayConfig()"
  (settingChanged)="updateDisplaySetting($event)"
  (resetRequested)="resetDisplaySettings()"
/>
```

**Tại sao child không nên trực tiếp thay đổi state của parent?** Vì nếu DisplaySettingsComponent tự gọi `displayConfigService.updateSetting(...)`, nó sẽ bị "gắn chặt" (tightly coupled) với service cụ thể đó. Bạn không thể tái sử dụng component ở nơi khác với logic khác. Bằng cách emit event, parent quyết định **làm gì** với event đó.

---

## PART 7 — SERVICES

### Service là gì?

Service là **class TypeScript bình thường** được Angular quản lý, chứa logic và state dùng chung giữa nhiều components.

### Vì sao cần Service?

Nếu không có service, mỗi component phải tự lấy data, tự quản lý state, tự lưu localStorage. Kết quả:
- Code bị lặp
- State bị phân tán (component A có danh sách favorites khác component B)
- Khó bảo trì

### 7.1 MovieService

📄 [movie.service.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/services/movie.service.ts):

```typescript
@Injectable({ providedIn: 'root' })
export class MovieService {
  private readonly http = inject(HttpClient);

  private readonly moviesState = signal<Movie[]>(MOVIES);
  private readonly loadingState = signal(false);
  private readonly errorMessageState = signal<string | null>(null);
  private readonly sourceLabelState = signal<MovieSourceLabel>('Local mock data');
  private hasLoadedConfiguredSource = false;

  readonly movies = this.moviesState.asReadonly();
  readonly loading = this.loadingState.asReadonly();
  readonly errorMessage = this.errorMessageState.asReadonly();
  readonly sourceLabel = this.sourceLabelState.asReadonly();
  ...
}
```

**Trách nhiệm:**
- Lưu trữ danh sách phim (`moviesState`)
- Quản lý trạng thái loading/error
- Cung cấp methods: `getMovies()`, `getMovieById()`, `searchMovies()`, `getFeaturedMovies()`, `getTopRatedMovies()`, `getRecommendedMovies()`
- Gọi HTTP khi cần (TMDB API, static JSON)
- Map data từ API bên ngoài vào model nội bộ

**Tại sao là Service mà không phải code trong component?**
- HomePageComponent, MoviesPageComponent, FavoritesPageComponent, MovieDetailPageComponent **tất cả** đều cần dữ liệu phim
- Nếu mỗi component tự lấy data → 4 lần gọi API giống nhau
- MovieService là singleton → chỉ có 1 instance, chia sẻ state giữa tất cả components

**`@Injectable({ providedIn: 'root' })`** → (Angular concept) nói với Angular: "Tạo DUY NHẤT 1 instance của service này cho toàn bộ ứng dụng và cung cấp nó cho bất kỳ ai yêu cầu."

**Pattern private signal + public readonly:**

```typescript
private readonly moviesState = signal<Movie[]>(MOVIES);  // Chỉ service có thể thay đổi
readonly movies = this.moviesState.asReadonly();            // Components chỉ có thể đọc
```

Điều này **ngăn** component trực tiếp gọi `movieService.moviesState.set(...)`. Chỉ MovieService mới quyết định khi nào và cách nào thay đổi danh sách phim.

### 7.2 FavoritesService

📄 [favorites.service.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/services/favorites.service.ts):

```typescript
@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly favoriteIdsState = signal<number[]>(this.readFavoriteIds());
  readonly favoriteIds = this.favoriteIdsState.asReadonly();
  readonly favoriteCount = computed(() => this.favoriteIdsState().length);

  isFavorite(movieId: number): boolean {
    return this.favoriteIdsState().includes(movieId);
  }

  toggleFavorite(movieId: number): void {
    const currentIds = this.favoriteIdsState();
    const nextIds = currentIds.includes(movieId)
      ? currentIds.filter((id) => id !== movieId)
      : [...currentIds, movieId];
    this.favoriteIdsState.set(nextIds);
    this.saveFavoriteIds(nextIds);
  }

  private readFavoriteIds(): number[] {
    try {
      const storedValue = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return storedValue ? JSON.parse(storedValue) as number[] : [];
    } catch { return []; }
  }

  private saveFavoriteIds(ids: number[]): void {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(ids));
    } catch { }
  }
}
```

**Trách nhiệm:**
- Quản lý danh sách movie IDs yêu thích
- Đọc/ghi localStorage
- Cung cấp `isFavorite()`, `toggleFavorite()`, `favoriteCount`

**Nơi sử dụng:** NavbarComponent, HomePageComponent, MoviesPageComponent, MovieDetailPageComponent, FavoritesPageComponent — **5 components** dùng cùng 1 instance!

### 7.3 DisplayConfigService

📄 [display-config.service.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/services/display-config.service.ts):

```typescript
@Injectable({ providedIn: 'root' })
export class DisplayConfigService {
  private readonly displayConfigState = signal<DisplayConfig>(this.readDisplayConfig());
  readonly displayConfig = this.displayConfigState.asReadonly();

  updateSetting(key: keyof DisplayConfig, value: boolean): void {
    const nextConfig = { ...this.displayConfigState(), [key]: value };
    this.displayConfigState.set(nextConfig);
    this.saveDisplayConfig(nextConfig);
  }

  resetToDefaults(): void {
    this.displayConfigState.set(DEFAULT_DISPLAY_CONFIG);
    this.saveDisplayConfig(DEFAULT_DISPLAY_CONFIG);
  }
  ...
}
```

**Trách nhiệm:**
- Quản lý cấu hình hiển thị (block nào hiện, block nào ẩn trên trang Home)
- Đọc/ghi localStorage

### Separation of Concerns

```
Component → "Tôi cần hiển thị danh sách phim yêu thích"
    ↓
Service → "Tôi biết phim nào được yêu thích, tôi quản lý danh sách"
    ↓
Data → localStorage, HTTP API
```

Mỗi lớp chỉ quan tâm đến **1 việc**. Component không biết data lưu ở đâu (localStorage? server?). Service không biết data hiển thị như thế nào.

---

## PART 8 — DEPENDENCY INJECTION (DI)

### Dependency là gì?

**Dependency** (phụ thuộc) = thứ mà một class cần để hoạt động.

MovieDetailPageComponent cần MovieService để lấy data phim → MovieService là **dependency** của MovieDetailPageComponent.

### Injection là gì?

**Injection** (tiêm vào) = cơ chế Angular **tự động cung cấp** dependency cho class, thay vì class phải tự tạo.

### Ví dụ thực tế

📄 [movie-detail-page.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/pages/movie-detail/movie-detail-page.ts):

```typescript
export class MovieDetailPageComponent {
  private readonly route = inject(ActivatedRoute);
  protected readonly movieService = inject(MovieService);
  protected readonly favoritesService = inject(FavoritesService);
  ...
}
```

- `inject(MovieService)` → Angular: "Cho tôi instance của MovieService"
- Angular tìm trong registry, thấy MovieService đã được đăng ký (`providedIn: 'root'`), trả về instance singleton
- Cùng instance MovieService được truyền cho **tất cả** components yêu cầu

### Tại sao không viết `new MovieService()` ?

```typescript
// ❌ KHÔNG NÊN LÀM
export class MovieDetailPageComponent {
  private movieService = new MovieService();  // Mỗi component tạo instance RIÊNG
}
```

Vấn đề:
1. **Mất singleton**: 5 components → 5 MovieService instances → 5 bản sao danh sách phim khác nhau
2. **Mất dependencies của service**: MovieService cần HttpClient. Ai cung cấp HttpClient cho MovieService mới? Bạn phải viết `new MovieService(new HttpClient(...))` → chuỗi dependency vô tận
3. **Khó test**: Không thể thay thế MovieService bằng mock trong unit test

### inject() vs Constructor Injection

Project này dùng `inject()` function (cách mới). Cách cũ tương đương:

```typescript
// Cách cũ (constructor injection) — KHÔNG dùng trong project này
export class MovieDetailPageComponent {
  constructor(
    private movieService: MovieService,
    private favoritesService: FavoritesService
  ) {}
}
```

Cả hai đều hợp lệ, `inject()` đơn giản hơn vì không cần constructor.

### Lifecycle / Singleton

Vì `providedIn: 'root'`, mỗi service chỉ có **1 instance** cho toàn bộ app. Instance được tạo lần đầu khi có component yêu cầu và sống cho đến khi app bị đóng/reload.

```
FavoritesService instance (singleton)
    ↑               ↑              ↑             ↑              ↑
NavbarComponent  HomePage     MoviesPage   MovieDetail    FavoritesPage
```

Tất cả đều trỏ đến cùng 1 object → thay đổi từ 1 nơi sẽ phản ánh ở tất cả nơi khác.

---

## PART 9 — SIGNALS

### Signal là gì?

Signal (tính năng Angular) là **một hộp chứa giá trị** mà Angular có thể theo dõi. Khi giá trị thay đổi, Angular biết template nào cần cập nhật.

### signal() — Trạng thái cơ bản

📄 [favorites.service.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/services/favorites.service.ts):

```typescript
private readonly favoriteIdsState = signal<number[]>(this.readFavoriteIds());
```

- `signal<number[]>(...)` → tạo signal chứa mảng số nguyên, khởi tạo bằng giá trị đọc từ localStorage
- Đọc giá trị: `this.favoriteIdsState()` (gọi như function)
- Ghi giá trị: `this.favoriteIdsState.set(newValue)`

📄 [movies-page.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/pages/movies/movies-page.ts):

```typescript
protected readonly filters = signal<SearchFilters>({
  searchText: '',
  genre: 'All',
  sort: 'rating-desc',
});
protected readonly currentPage = signal(1);
```

Signals dùng ở component level để lưu trạng thái UI (filters, page hiện tại).

### computed() — Giá trị phái sinh

`computed()` tạo signal **tự động tính lại** khi dependencies thay đổi.

📄 [favorites.service.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/services/favorites.service.ts):

```typescript
readonly favoriteCount = computed(() => this.favoriteIdsState().length);
```

- Khi `favoriteIdsState` thay đổi (thêm/xóa phim) → `favoriteCount` **tự động** tính lại
- Không cần viết code cập nhật `favoriteCount` thủ công
- Nếu không ai đọc `favoriteCount`, computed thậm chí **không chạy** (lazy evaluation)

📄 [movies-page.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/pages/movies/movies-page.ts):

```typescript
protected readonly filteredMovies = computed(() => this.movieService.searchMovies(this.filters()));
protected readonly totalPages = computed(() => Math.max(1, Math.ceil(this.filteredMovies().length / this.pageSize)));
protected readonly pageNumbers = computed(() => Array.from({ length: this.totalPages() }, (_, index) => index + 1));
protected readonly visibleMovies = computed(() => {
  const startIndex = (this.currentPage() - 1) * this.pageSize;
  return this.filteredMovies().slice(startIndex, startIndex + this.pageSize);
});
```

Đây là **chuỗi computed**: `filters` → `filteredMovies` → `totalPages` → `pageNumbers` → `visibleMovies`. Khi user thay đổi filter, toàn bộ chuỗi tự cập nhật.

```
filters signal thay đổi (user gõ search)
        ↓
filteredMovies computed tính lại (filter danh sách)
        ↓
totalPages computed tính lại (số trang mới)
        ↓
pageNumbers computed tính lại (mảng [1, 2, 3])
        ↓
visibleMovies computed tính lại (phim trang hiện tại)
        ↓
Template tự cập nhật UI
```

### Luồng hoàn chỉnh: Favorite button click

```
User click "Save" trên MovieCard
        ↓
Event chuyển lên qua output chain
        ↓
Page gọi favoritesService.toggleFavorite(movieId)
        ↓
favoriteIdsState.set(nextIds)           ← signal thay đổi
        ↓ (tự động)
favoriteCount = computed(...)           ← tính lại: 2 → 3
        ↓ (tự động)
NavbarComponent template:
  "Favorites ({{ favoritesService.favoriteCount() }})"
                                        ← hiển thị "Favorites (3)"
        ↓ (tự động)
MovieCardComponent template:
  [class.saved]="isFavorite()"          ← nút đổi thành "Saved"
```

### asReadonly()

```typescript
private readonly moviesState = signal<Movie[]>(MOVIES);
readonly movies = this.moviesState.asReadonly();
```

- `asReadonly()` tạo **read-only view** của signal
- Components có thể đọc `movieService.movies()` nhưng **KHÔNG THỂ** gọi `movieService.movies.set(...)`
- Chỉ MovieService mới có thể thay đổi `moviesState`

### Khi nào dùng Signal? Khi nào dùng biến thường?

| Signal | Biến thường |
|---|---|
| Khi UI cần tự cập nhật khi giá trị thay đổi | Khi giá trị là hằng số hoặc chỉ dùng trong logic |
| Khi state được chia sẻ qua service | Khi giá trị local chỉ dùng trong 1 method |
| Khi cần computed/derived state | Khi giá trị tính 1 lần rồi thôi |

Ví dụ biến thường trong project — [movies-page.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/pages/movies/movies-page.ts):

```typescript
protected readonly pageSize = PAGE_SIZE;  // Hằng số, không bao giờ thay đổi
```

Ví dụ biến thường trong service — [movie.service.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/services/movie.service.ts):

```typescript
private hasLoadedConfiguredSource = false;  // Chỉ dùng trong logic, không hiện trên UI
```

---

## PART 10 — ROUTING

### Routing là gì?

Routing cho phép Angular **thay đổi nội dung trang** dựa trên URL mà **không reload toàn bộ trang** (Single Page Application — SPA).

### Routes thực tế

📄 [app.routes.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/app.routes.ts):

```typescript
import { Routes } from '@angular/router';
import { validMovieIdGuard } from './guards/valid-movie-id.guard';

export const routes: Routes = [
  {
    path: '',
    title: 'Movie Explorer - Home',
    loadComponent: () => import('./pages/home/home-page').then((m) => m.HomePageComponent),
  },
  {
    path: 'movies',
    title: 'Movie Explorer - Movies',
    loadComponent: () => import('./pages/movies/movies-page').then((m) => m.MoviesPageComponent),
  },
  {
    path: 'movies/:id',
    title: 'Movie Explorer - Movie Detail',
    canActivate: [validMovieIdGuard],
    loadComponent: () => import('./pages/movie-detail/movie-detail-page').then((m) => m.MovieDetailPageComponent),
  },
  {
    path: 'favorites',
    title: 'Movie Explorer - Favorites',
    loadComponent: () => import('./pages/favorites/favorites-page').then((m) => m.FavoritesPageComponent),
  },
  {
    path: 'settings',
    title: 'Movie Explorer - Settings',
    loadComponent: () => import('./pages/settings/settings-page').then((m) => m.SettingsPageComponent),
  },
  { path: '**', redirectTo: '' },
];
```

Giải thích từng route:

- **`path: ''`** → URL gốc (`http://localhost:4200/`) → HomePageComponent
- **`path: 'movies'`** → `/movies` → MoviesPageComponent
- **`path: 'movies/:id'`** → `/movies/5`, `/movies/26` → MovieDetailPageComponent. `:id` là **route parameter** — phần động của URL
- **`path: 'favorites'`** → `/favorites` → FavoritesPageComponent
- **`path: 'settings'`** → `/settings` → SettingsPageComponent
- **`path: '**'`** → Wildcard: bất kỳ URL nào khác → redirect về trang Home

- **`title`** → Angular tự set `document.title` khi route active (SEO + tab title)
- **`canActivate: [validMovieIdGuard]`** → Guard kiểm tra trước khi cho phép vào route (xem Part 17)
- **`loadComponent: () => import(...)`** → Lazy loading (xem Part 11)

### RouterOutlet

📄 [app.html](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/app.html):

```html
<app-navbar />
<main class="app-main">
  <router-outlet />
</main>
```

`<router-outlet>` là **placeholder**. Angular **thay thế** nó bằng component tương ứng với URL hiện tại:
- URL = `/` → chèn HomePageComponent
- URL = `/movies` → xóa HomePageComponent, chèn MoviesPageComponent
- Navbar luôn hiện vì nó nằm **ngoài** `<router-outlet>`

### RouterLink

📄 [navbar.html](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/components/navbar/navbar.html):

```html
<a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a>
<a routerLink="/movies" routerLinkActive="active">Movies</a>
<a routerLink="/favorites" routerLinkActive="active">Favorites ({{ favoritesService.favoriteCount() }})</a>
<a routerLink="/settings" routerLinkActive="active">Settings</a>
```

- **`routerLink="/movies"`** → (Angular directive) khi click, Angular điều hướng đến `/movies` **mà không reload trang**
- Nếu dùng `href="/movies"` (HTML thuần), browser sẽ **reload toàn bộ trang** → mất state, mất performance
- **`routerLinkActive="active"`** → Angular tự **thêm class `active`** vào link nào match URL hiện tại
- **`[routerLinkActiveOptions]="{ exact: true }"`** → cho route `/`, yêu cầu match **chính xác**. Nếu không, `/movies` cũng bắt đầu bằng `/` → link Home sẽ luôn active

### RouterLink với route parameters

📄 [movie-card.html](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/components/movie-card/movie-card.html):

```html
<a class="details-link" [routerLink]="['/movies', movie().id]">View details</a>
```

- `[routerLink]="['/movies', movie().id]"` → property binding truyền mảng: `['/movies', 5]` → URL = `/movies/5`
- Đây là cách tạo URL **động** dựa trên data

### Đọc route parameters

📄 [movie-detail-page.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/pages/movie-detail/movie-detail-page.ts):

```typescript
private readonly route = inject(ActivatedRoute);
protected readonly movieId = Number(this.route.snapshot.paramMap.get('id'));
protected readonly movie = computed(() => this.movieService.getMovieById(this.movieId));
```

- `inject(ActivatedRoute)` → Angular cung cấp thông tin về route hiện tại
- `this.route.snapshot.paramMap.get('id')` → lấy giá trị của `:id` từ URL. Nếu URL = `/movies/5`, giá trị = `'5'` (string)
- `Number(...)` → convert string thành number
- `computed(() => this.movieService.getMovieById(this.movieId))` → tìm phim trong danh sách theo id

### Luồng hoàn chỉnh khi click "View details"

```
User click "View details" trên MovieCard (movie id = 5)
        ↓
RouterLink: ['/movies', 5] → URL = /movies/5
        ↓
Router kiểm tra route 'movies/:id'
        ↓
validMovieIdGuard kiểm tra: 5 là integer > 0? → Cho phép
        ↓
loadComponent: import MovieDetailPageComponent (lazy load)
        ↓
Angular tạo MovieDetailPageComponent instance
        ↓
route.snapshot.paramMap.get('id') → '5' → Number → 5
        ↓
movieService.getMovieById(5) → tìm movie trong signal
        ↓
Template render chi tiết phim
```

---

## PART 11 — LAZY LOADING

### Lazy Loading là gì?

**Eager loading** = tải **tất cả** code ngay khi app khởi chạy
**Lazy loading** = tải code **khi cần** (khi user navigate đến route đó)

### Ví dụ thực tế

📄 [app.routes.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/app.routes.ts):

```typescript
{
  path: 'settings',
  title: 'Movie Explorer - Settings',
  loadComponent: () => import('./pages/settings/settings-page').then((m) => m.SettingsPageComponent),
},
```

- **`loadComponent: () => import(...)`** → dùng JavaScript dynamic `import()` (tính năng browser/bundler, không phải Angular)
- Angular chỉ load file `settings-page.ts` + dependencies khi user navigate đến `/settings`
- `.then((m) => m.SettingsPageComponent)` → sau khi load module, lấy export `SettingsPageComponent`

**TẤT CẢ 5 routes** trong project đều dùng lazy loading.

### Eager loading sẽ trông như thế nào (so sánh)

```typescript
// Nếu dùng eager loading (KHÔNG phải code trong project)
import { HomePageComponent } from './pages/home/home-page';
{ path: '', component: HomePageComponent }
```

Sự khác biệt: `import` ở đầu file → code được load ngay lập tức.
Với `loadComponent: () => import(...)`, `import` nằm trong arrow function → chỉ chạy khi Angular cần.

### Cái gì thực sự được tải sau?

Khi dùng `loadComponent`, bundler (công cụ build) sẽ tách component và dependencies thành file JavaScript riêng (chunk). Browser tải chunk này chỉ khi user navigate đến route tương ứng.

### Khi nào nên dùng lazy loading?

| Nên | Không cần |
|---|---|
| Trang ít được truy cập (Settings, Admin) | Component nhỏ dùng mọi nơi (Navbar) |
| Ứng dụng lớn với nhiều features | Ứng dụng nhỏ với vài trang |
| Trang phức tạp có nhiều dependencies | Root component |

Trong project nhỏ như Movie Explorer, lazy loading ít tạo sự khác biệt đáng kể, nhưng đây là **good practice** cho khi project phát triển lớn hơn.

---

## PART 12 — REACTIVE FORMS

### Reactive Forms là gì?

Reactive Forms là cách Angular quản lý form input **từ TypeScript**, thay vì phụ thuộc vào HTML. Bạn tạo model form trong code, rồi bind vào template.

### Ví dụ thực tế

📄 [search-bar.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/components/search-bar/search-bar.ts):

```typescript
protected readonly filtersForm = new FormGroup({
  searchText: new FormControl('', { nonNullable: true }),
  genre: new FormControl<MovieGenre | 'All'>('All', { nonNullable: true }),
  sort: new FormControl<MovieSort>('rating-desc', { nonNullable: true }),
});
```

Giải thích:

- **`FormGroup`** — Container chứa nhiều form controls liên quan. Ở đây: searchText + genre + sort thuộc cùng nhóm "filters".
- **`FormControl('', { nonNullable: true })`** — 1 input field. `''` là giá trị khởi tạo. `nonNullable: true` nghĩa là giá trị luôn là string, không bao giờ là `null`.
- **`FormControl<MovieSort>('rating-desc')`** — TypeScript generic chỉ định kiểu giá trị là `MovieSort`.

📄 [search-bar.html](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/components/search-bar/search-bar.html):

```html
<form class="filters" [formGroup]="filtersForm" aria-label="Movie filters">
  <label>
    <span>Search by title</span>
    <input type="search" formControlName="searchText" placeholder="Try Inception" />
  </label>

  <label>
    <span>Genre</span>
    <select formControlName="genre">
      @for (genre of genres; track genre) {
        <option [value]="genre">{{ genre }}</option>
      }
    </select>
  </label>

  <label>
    <span>Sort</span>
    <select formControlName="sort">
      <option value="rating-desc">Rating: High to Low</option>
      <option value="newest">Newest</option>
      <option value="oldest">Oldest</option>
      <option value="title-az">Title A-Z</option>
    </select>
  </label>

  <button type="button" (click)="clearSearch()">Clear</button>
</form>
```

- **`[formGroup]="filtersForm"`** → bind form HTML với FormGroup trong TypeScript
- **`formControlName="searchText"`** → bind input này với FormControl có tên `searchText`
- Khi user gõ, Angular tự cập nhật `filtersForm.value.searchText`

### valueChanges

📄 [search-bar.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/components/search-bar/search-bar.ts):

```typescript
ngOnInit(): void {
  this.emitFilters();
  this.filtersForm.valueChanges.subscribe(() => this.emitFilters());
}
```

- **`ngOnInit()`** → Lifecycle hook (Angular concept): method được Angular gọi **1 lần** sau khi component khởi tạo xong
- **`valueChanges`** → Observable (RxJS concept) phát ra mỗi khi bất kỳ control nào trong form thay đổi
- **`.subscribe(() => this.emitFilters())`** → mỗi khi form thay đổi, gọi `emitFilters()` → emit giá trị form lên parent

### patchValue

```typescript
clearSearch(): void {
  this.filtersForm.patchValue({ searchText: '', genre: 'All', sort: 'rating-desc' });
}
```

- `patchValue` cập nhật **một số** controls trong form (không cần cập nhật tất cả)
- Sau khi giá trị thay đổi, `valueChanges` tự phát ra → `emitFilters()` được gọi

### Luồng data

```
User gõ "inception" vào search input
        ↓
formControlName="searchText" → FormControl tự cập nhật giá trị
        ↓
filtersForm.valueChanges phát ra
        ↓
subscribe callback gọi emitFilters()
        ↓
filtersChanged.emit(value)   ← output event
        ↓
MoviesPage.updateFilters(filters) nhận event
        ↓
this.filters.set(filters)    ← signal thay đổi
        ↓
filteredMovies computed tính lại
        ↓
Template cập nhật danh sách phim
```

### Tại sao dùng Reactive Forms thay vì event binding đơn giản?

Với 3 inputs liên quan (search + genre + sort), Reactive Forms cho phép:
- Lấy tất cả giá trị cùng lúc: `filtersForm.getRawValue()`
- Reset tất cả cùng lúc: `filtersForm.patchValue({...})`
- Lắng nghe thay đổi trên toàn bộ form: `valueChanges`

Nếu dùng `(input)` event riêng cho từng field → phải viết 3 handlers riêng, tự tổng hợp giá trị.

> [!NOTE]
> Project này **không** sử dụng validation (`Validators.required`, `Validators.min`...) trên Reactive Forms. Đây là tính năng có sẵn của Reactive Forms nhưng không cần thiết cho search filters.

---

## PART 13 — HTTPCLIENT

### Kiến trúc trong project

```
Component (HomePage, MoviesPage...)
    ↓ inject
MovieService
    ↓ inject
HttpClient
    ↓
Interceptor (thêm headers, timeout)
    ↓
Network request (TMDB API hoặc static JSON)
```

### Ví dụ thực tế

📄 [movie.service.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/services/movie.service.ts):

```typescript
private readonly http = inject(HttpClient);

getMoviesFromStaticJson(): Observable<Movie[]> {
  return this.http.get<Movie[]>(environment.movieApi.staticMoviesUrl);
}
```

- `inject(HttpClient)` → Angular cung cấp HttpClient (đã đăng ký qua `provideHttpClient()` trong app.config.ts)
- `this.http.get<Movie[]>(url)` → tạo HTTP GET request, trả về `Observable<Movie[]>`
- `Observable` (RxJS concept, không phải Angular) là "stream dữ liệu" — nó **không gửi request ngay**, chỉ khi có `.subscribe()` mới thực sự gọi

### Load movies phức tạp hơn

📄 [movie.service.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/services/movie.service.ts):

```typescript
loadMovies(): void {
  if (this.hasLoadedConfiguredSource) { return; }
  this.hasLoadedConfiguredSource = true;

  if (environment.movieApi.dataSource === 'mock') {
    this.useLocalMovies('Local mock data');
    return;
  }
  // ... kiểm tra API key ...

  this.loadingState.set(true);
  this.errorMessageState.set(null);

  this.getConfiguredRemoteMovies()
    .pipe(
      catchError(() => {
        this.errorMessageState.set('Could not load remote movies. Showing local fallback data.');
        this.sourceLabelState.set('Local fallback data');
        return of(MOVIES);
      }),
      finalize(() => this.loadingState.set(false)),
    )
    .subscribe((movies) => this.moviesState.set(movies));
}
```

Giải thích từng phần:

- **`hasLoadedConfiguredSource`** → flag ngăn load lại (vì nhiều pages gọi `loadMovies()`)
- **`.pipe(...)`** → (RxJS concept) chuỗi operators xử lý Observable
- **`catchError(() => { ... return of(MOVIES); })`** → nếu HTTP request lỗi, hiện thông báo lỗi và **fallback** về data local (`MOVIES` từ file `data/movies.ts`)
- **`finalize(() => ...)`** → chạy sau khi Observable complete hoặc error → tắt loading
- **`.subscribe((movies) => this.moviesState.set(movies))`** → khi nhận được data, lưu vào signal

### TMDB API mapping

```typescript
private getPopularMoviesFromTmdb(): Observable<Movie[]> {
  return this.http
    .get<TmdbPopularResponse>(`${environment.movieApi.tmdbBaseUrl}/movie/popular`)
    .pipe(map((response) => response.results.map((movie, index) => this.mapTmdbMovie(movie, index))));
}
```

- **`.pipe(map(...))`** → `map` (RxJS operator) transform data: từ `TmdbPopularResponse` → `Movie[]`
- Xem Part 14 cho chi tiết mapping

### Cấu hình HttpClient

📄 [app.config.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/app.config.ts):

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([movieApiInterceptor])),
    provideRouter(routes),
  ]
};
```

- `provideHttpClient(withInterceptors([movieApiInterceptor]))` → đăng ký HttpClient với interceptor

---

## PART 14 — API RESPONSE MAPPING

### Vấn đề

API bên ngoài (TMDB) trả về data với **tên field khác** với model nội bộ:

| TMDB API | Movie model nội bộ |
|---|---|
| `title` hoặc `name` | `title` |
| `release_date` (`"2019-05-24"`) | `year` (`2019`) |
| `overview` | `description` |
| `poster_path` (`"/abc123.jpg"`) | `posterUrl` (URL đầy đủ) |
| `vote_average` | `rating` |
| Không có | `genre` (mặc định `'Drama'`) |
| Không có | `director`, `duration` |

### Mapper thực tế

📄 [movie.service.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/services/movie.service.ts):

```typescript
private mapTmdbMovie(movie: TmdbMovie, index: number): Movie {
  const releaseYear = movie.release_date ? Number(movie.release_date.slice(0, 4)) : 2026;

  return {
    id: movie.id,
    title: movie.title ?? movie.name ?? 'Untitled Movie',
    year: Number.isNaN(releaseYear) ? 2026 : releaseYear,
    genre: 'Drama',
    rating: Number((movie.vote_average ?? 0).toFixed(1)),
    description: movie.overview || 'No description was provided by the remote API.',
    posterUrl: movie.poster_path
      ? `https://image.tmdb.org/t/p/w780${movie.poster_path}`
      : `https://placehold.co/640x420/111827/f8fafc?text=Remote+Movie+${index + 1}`,
    director: 'Remote API',
    duration: 'Unknown',
  };
}
```

### Tại sao mapping tốt hơn?

```
Không mapping (❌):
  TMDB API response → template trực tiếp dùng response.results[0].poster_path
                       → Nếu TMDB đổi API → SỬA MỌI TEMPLATE

Có mapping (✅):
  TMDB API response → mapTmdbMovie() → Movie interface → templates dùng movie.posterUrl
                                   ↑                              ↑
                              Sửa 1 chỗ nếu API đổi       Không cần sửa templates
```

---

## PART 15 — LOADING / SUCCESS / EMPTY / ERROR STATES

### State machine cho UI async

```
                ┌──── Loading ────┐
                │                 │
                ▼                 ▼
            Success            Error
          (có data)        (có lỗi + fallback)
                │
                ▼
             Empty
          (không có data)
```

### Ví dụ 1: MovieGridComponent

📄 [movie-grid.html](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/components/movie-grid/movie-grid.html):

```html
@if (errorMessage()) {
  <p class="state-message warning" aria-live="polite">{{ errorMessage() }}</p>
}

@if (isLoading()) {
  <p class="state-message loading" aria-live="polite">Loading movies...</p>
} @else if (movies().length > 0) {
  <div class="movie-grid">
    @for (movie of movies(); track movie.id) {
      <app-movie-card ... />
    }
  </div>
} @else {
  <p class="empty-state">{{ emptyMessage() }}</p>
}
```

- **Loading**: hiện text "Loading movies..."
- **Success (có data)**: hiện grid các movie cards
- **Empty (không data)**: hiện "No movies found."
- **Error**: hiện warning message (luôn hiện nếu có, kể cả khi đã fallback về local data)

### Ví dụ 2: MovieDetailPage

📄 [movie-detail-page.html](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/pages/movie-detail/movie-detail-page.html):

```html
@if (movieService.loading()) {
  <section class="not-found" aria-live="polite">
    <h1>Loading movie...</h1>
    <p>Checking the configured movie data source.</p>
  </section>
} @else if (movie(); as currentMovie) {
  <article class="detail-layout">
    ...chi tiết phim...
  </article>
} @else {
  <section class="not-found" aria-live="polite">
    <h1>Movie not found.</h1>
    <p>The movie ID in the URL does not match the active movie data.</p>
    <a routerLink="/movies">Browse movies</a>
  </section>
}
```

3 trạng thái: Loading → Found → Not found.

### Tại sao không nên hiện trang trắng?

Nếu không xử lý loading state, khi HTTP request mất 2 giây, user thấy trang trắng 2 giây → nghĩ app bị lỗi. Loading indicator cho user biết "app đang làm việc".

---

## PART 16 — HTTP INTERCEPTOR

### Interceptor là gì?

Interceptor là middleware cho HTTP requests. Nó **chặn** mọi request trước khi gửi đi và có thể **sửa đổi** request.

### Kiến trúc

```
Component
    ↓
Service (MovieService)
    ↓
HttpClient.get(url)
    ↓
movieApiInterceptor  ← CHẶN Ở ĐÂY
    ↓ (thêm headers, timeout)
Network (HTTP request thực sự)
```

### Interceptor thực tế

📄 [movie-api.interceptor.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/interceptors/movie-api.interceptor.ts):

```typescript
import { HttpInterceptorFn } from '@angular/common/http';
import { timeout } from 'rxjs';
import { environment } from '../../environments/environment';

export const movieApiInterceptor: HttpInterceptorFn = (request, next) => {
  let headers = request.headers.set('X-Movie-Explorer-Client', 'angular-learning-project');

  if (request.url.startsWith(environment.movieApi.tmdbBaseUrl) && environment.movieApi.tmdbApiKey) {
    headers = headers.set('Authorization', `Bearer ${environment.movieApi.tmdbApiKey}`);
  }

  return next(request.clone({ headers })).pipe(
    timeout(environment.movieApi.requestTimeoutMs),
  );
};
```

Giải thích từng dòng:

1. **`HttpInterceptorFn`** — Kiểu function interceptor (Angular concept). Nhận `request` (request gốc) và `next` (function gọi interceptor tiếp theo hoặc gửi request thực sự).

2. **`headers.set('X-Movie-Explorer-Client', 'angular-learning-project')`** — Thêm custom header vào **MỌI** request. Đây là nơi tập trung — không cần thêm header ở từng service.

3. **`if (request.url.startsWith(environment.movieApi.tmdbBaseUrl) && environment.movieApi.tmdbApiKey)`** — Chỉ thêm `Authorization` header khi request đi đến TMDB API VÀ có API key.

4. **`request.clone({ headers })`** — HTTP requests trong Angular là **immutable** (không thể sửa trực tiếp). Phải tạo bản sao mới với headers mới.

5. **`timeout(environment.movieApi.requestTimeoutMs)`** — (RxJS operator) nếu request mất quá 5000ms → tự động lỗi. Ngăn request treo vĩnh viễn.

### Đăng ký Interceptor

📄 [app.config.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/app.config.ts):

```typescript
provideHttpClient(withInterceptors([movieApiInterceptor])),
```

Mảng interceptors → có thể thêm nhiều interceptors. Chúng chạy **theo thứ tự** trong mảng.

### Khi nào nên / không nên dùng Interceptor?

| Nên | Không nên |
|---|---|
| Thêm auth token vào mọi request | Logic nghiệp vụ cụ thể cho 1 API |
| Logging/monitoring tập trung | Transform response cho 1 endpoint cụ thể |
| Timeout chung | Xử lý lỗi riêng cho từng tính năng |
| Thêm common headers | Cache logic phức tạp |

---

## PART 17 — ROUTE GUARD

### Guard là gì?

Route Guard là function **chạy trước khi** Angular load route component. Nó quyết định: **cho phép** hay **chặn** điều hướng.

### Guard thực tế

📄 [valid-movie-id.guard.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/guards/valid-movie-id.guard.ts):

```typescript
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const validMovieIdGuard: CanActivateFn = (route) => {
  const movieId = Number(route.paramMap.get('id'));

  if (Number.isInteger(movieId) && movieId > 0) {
    return true;
  }

  return inject(Router).parseUrl('/movies');
};
```

Giải thích:

1. **`CanActivateFn`** — Kiểu function guard. Nhận `route` chứa thông tin route sắp được navigate đến.
2. **`route.paramMap.get('id')`** — Lấy giá trị tham số `:id` từ URL
3. **`Number.isInteger(movieId) && movieId > 0`** — Kiểm tra: id phải là số nguyên dương
4. **`return true`** → cho phép navigate
5. **`return inject(Router).parseUrl('/movies')`** → chặn và redirect về `/movies`

### Luồng

```
User truy cập /movies/abc
        ↓
Router match route 'movies/:id'
        ↓
canActivate: [validMovieIdGuard]
        ↓
validMovieIdGuard chạy:
  movieId = Number('abc') = NaN
  Number.isInteger(NaN) = false
        ↓
return Router.parseUrl('/movies')  → Redirect!
        ↓
User thấy trang Movies, không thấy lỗi
```

### ĐÂY KHÔNG PHẢI BẢO MẬT THẬT

> [!WARNING]
> Route guards chạy **trên browser** của user. User có thể:
> - Tắt JavaScript
> - Sửa code trong DevTools
> - Gọi API trực tiếp mà không qua app
>
> Guards chỉ cải thiện **trải nghiệm người dùng** (UX), KHÔNG BẢO VỆ dữ liệu. **Backend phải luôn kiểm tra quyền truy cập riêng.**

Trong project này, guard chỉ kiểm tra format URL hợp lệ — không có authentication nào cần bảo vệ.

---

## PART 18 — LOCALSTORAGE

### localStorage là gì?

`localStorage` là **Browser API** (không phải Angular feature). Nó cho phép lưu dữ liệu dạng key-value string trên browser, **tồn tại sau khi đóng/mở lại browser**.

### Nơi sử dụng trong project

**1. FavoritesService**

📄 [favorites.service.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/services/favorites.service.ts):

```typescript
const FAVORITES_STORAGE_KEY = 'movie-explorer-favorites';

// Đọc
private readFavoriteIds(): number[] {
  try {
    const storedValue = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return storedValue ? JSON.parse(storedValue) as number[] : [];
  } catch { return []; }
}

// Ghi
private saveFavoriteIds(ids: number[]): void {
  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(ids));
  } catch { }
}
```

**2. DisplayConfigService**

📄 [display-config.service.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/services/display-config.service.ts):

```typescript
const DISPLAY_CONFIG_STORAGE_KEY = 'movie-explorer-display-config';

private readDisplayConfig(): DisplayConfig {
  try {
    const storedValue = localStorage.getItem(DISPLAY_CONFIG_STORAGE_KEY);
    return storedValue
      ? { ...DEFAULT_DISPLAY_CONFIG, ...JSON.parse(storedValue) as Partial<DisplayConfig> }
      : DEFAULT_DISPLAY_CONFIG;
  } catch { return DEFAULT_DISPLAY_CONFIG; }
}
```

Đáng chú ý: `{ ...DEFAULT_DISPLAY_CONFIG, ...JSON.parse(storedValue) }` — merge với default values, đảm bảo nếu thêm setting mới trong code, nó có giá trị mặc định kể cả khi localStorage chứa phiên bản config cũ.

### Tại sao data tồn tại sau refresh?

- **JavaScript variables**: mất khi refresh (vì memory bị xóa)
- **localStorage**: lưu trên ổ cứng browser → tồn tại đến khi user xóa thủ công hoặc code gọi `localStorage.removeItem()`

### Hạn chế

- Chỉ lưu **string** → phải `JSON.stringify()` khi ghi, `JSON.parse()` khi đọc
- Giới hạn ~5-10MB (tùy browser)
- **Đồng bộ** (synchronous) → block main thread nếu data lớn
- Có thể bị user xóa bất cứ lúc nào
- **KHÔNG AN TOÀN** cho dữ liệu nhạy cảm (bất kỳ JavaScript nào trên trang đều đọc được)

### try/catch

Cả hai services đều wrap localStorage trong `try/catch` vì:
- Incognito mode có thể chặn localStorage
- Storage có thể đầy
- Trong những trường hợp này, service vẫn hoạt động (dùng giá trị mặc định), chỉ mất persistence

---

## PART 19 — MENTOR REQUIREMENT (Configurable Content Blocks)

### Yêu cầu

> "Xây dựng website đơn giản với cấu trúc rõ ràng, mỗi content block có thể được cấu hình để hiện hoặc ẩn."

### 1. Content block là gì?

Trong project này, content block = **một section trên trang Home** có thể bật/tắt. Có 4 blocks:

| Block | Component | Mô tả |
|---|---|---|
| `hero` | HeroComponent | Banner chính với tiêu đề và nút "Browse movies" |
| `featuredMovies` | MovieGridComponent | Grid phim nổi bật |
| `topRatedMovies` | MovieGridComponent | Grid phim đánh giá cao |
| `recommendations` | MovieGridComponent | Grid phim đề xuất |

### 2. Config model ở đâu?

📄 [models/display-config.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/models/display-config.ts):

```typescript
export interface DisplayConfig {
  hero: boolean;
  featuredMovies: boolean;
  topRatedMovies: boolean;
  recommendations: boolean;
}

export const DEFAULT_DISPLAY_CONFIG: DisplayConfig = {
  hero: true,
  featuredMovies: true,
  topRatedMovies: true,
  recommendations: true,
};
```

Mỗi property boolean → `true` = hiện, `false` = ẩn.

### 3. Config state lưu ở đâu?

📄 [display-config.service.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/services/display-config.service.ts):

```typescript
private readonly displayConfigState = signal<DisplayConfig>(this.readDisplayConfig());
readonly displayConfig = this.displayConfigState.asReadonly();
```

State lưu trong **signal** (memory) + **localStorage** (persistence).

### 4. Settings thay đổi ở đâu?

📄 [settings-page.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/pages/settings/settings-page.ts) + [display-settings.html](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/components/display-settings/display-settings.html):

```html
<input type="checkbox" [checked]="config().hero" (change)="updateSetting('hero', $event)" />
<span>Hero Section</span>
```

### 5. Home đọc config ở đâu?

📄 [home-page.html](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/pages/home/home-page.html):

```html
@if (displayConfigService.displayConfig().hero) {
  <app-hero />
}
```

### 6. @if điều khiển rendering ở đâu?

Trong [home-page.html](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/pages/home/home-page.html) — có 4 `@if` blocks tương ứng 4 config properties.

### 7. localStorage persistence hoạt động thế nào?

```
User bỏ check "Hero Section" → checkbox unchecked
        ↓
DisplaySettingsComponent.updateSetting('hero', event)
        ↓
emit { key: 'hero', value: false }
        ↓
SettingsPage.updateDisplaySetting(change)
        ↓
displayConfigService.updateSetting('hero', false)
        ↓
signal: { hero: false, featuredMovies: true, ... }
localStorage: '{"hero":false,"featuredMovies":true,...}'
        ↓
User navigate về Home
        ↓
@if (displayConfigService.displayConfig().hero)  → false
        ↓
HeroComponent KHÔNG ĐƯỢC RENDER trong DOM
        ↓
User refresh browser
        ↓
DisplayConfigService constructor: readDisplayConfig()
        ↓
localStorage.getItem('movie-explorer-display-config')
        ↓
Parse JSON → signal khởi tạo với { hero: false, ... }
        ↓
HeroComponent vẫn không render → PERSISTENCE THÀNH CÔNG
```

### 8. Tại sao @if tốt hơn CSS display:none?

| Aspect | `@if (false)` | CSS `display: none` |
|---|---|---|
| DOM | Element bị XÓA | Element vẫn tồn tại |
| Component lifecycle | Bị destroy, giải phóng memory | Vẫn chạy, giữ subscriptions |
| Child components | Bị destroy | Vẫn active |
| HTTP requests | Không gọi (nếu trigger trong component) | Component vẫn gọi |
| Performance | Tốt hơn với content nặng | Lãng phí resource |

### 9. Tại sao đây thể hiện Angular structure tốt?

```
Model        → DisplayConfig interface (models/)
State        → DisplayConfigService signal (services/)
Persistence  → localStorage (trong service)
Settings UI  → DisplaySettingsComponent (components/)
Page         → SettingsPageComponent (pages/)
Consumer     → HomePageComponent đọc config (pages/)
Rendering    → @if trong template
```

Mỗi concern nằm ở **đúng vị trí**:
- Model không biết về UI
- Service không biết về template
- Component không biết về localStorage
- Template chỉ đọc signal và render

### 10. LUỒNG HOÀN CHỈNH

```
┌─────────────────────────────────────────────────────────┐
│                    SettingsPage                          │
│  inject(DisplayConfigService)                           │
│  updateDisplaySetting(change) → service.updateSetting() │
│  resetDisplaySettings() → service.resetToDefaults()     │
│         │                                               │
│         ▼ [config] input                                │
│  ┌─────────────────────────────────┐                    │
│  │   DisplaySettingsComponent      │                    │
│  │   checkbox (change) →           │                    │
│  │     settingChanged.emit(...)  ──┘ ← (output) event  │
│  └─────────────────────────────────┘                    │
└─────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│            DisplayConfigService                         │
│  signal<DisplayConfig> ← source of truth                │
│  updateSetting(key, value):                             │
│    1. update signal                                     │
│    2. localStorage.setItem(...)                          │
└─────────────────────────────────────────────────────────┘
                    │
          signal thay đổi
                    │
        ┌───────────┴───────────┐
        ▼                       ▼
┌──────────────┐     ┌──────────────────┐
│   HomePage   │     │  (next refresh)  │
│              │     │  Service reads   │
│ @if (config  │     │  localStorage    │
│ .hero) {     │     │  → signal init   │
│   <hero />   │     │  with saved      │
│ }            │     │  config          │
└──────────────┘     └──────────────────┘
```

---

## PART 20 — KHI NÀO DÙNG TỪNG ANGULAR CONCEPT

| Concept | Giải quyết vấn đề gì | Nơi dùng trong project | Khi nào dùng | Khi nào KHÔNG dùng |
|---|---|---|---|---|
| **Component** | Chia UI thành phần có thể quản lý | Mọi nơi (11 components) | Mọi phần UI | Đừng tạo component cho 1 element đơn lẻ |
| **Service** | Logic/state dùng chung | MovieService, FavoritesService, DisplayConfigService | Khi nhiều components cần cùng data/logic | Logic chỉ dùng trong 1 component |
| **DI (`inject()`)** | Cung cấp dependencies mà không coupling | Mọi service/guard/interceptor injection | Luôn luôn khi cần service | Đừng dùng cho data đơn giản |
| **input()** | Parent truyền data xuống child | MovieCard, MovieGrid, DisplaySettings | Khi child cần data từ parent | Khi data có sẵn qua service |
| **output()** | Child thông báo event lên parent | MovieCard, MovieGrid, SearchBar, DisplaySettings | Khi child cần báo cho parent | Khi child nên gọi service trực tiếp (hiếm) |
| **signal()** | Reactive state mà UI theo dõi | Services (3), MoviesPage | State ảnh hưởng đến UI rendering | Hằng số, biến tạm trong method |
| **computed()** | Derived state tự tính lại | FavoritesService, HomePage, MoviesPage, FavoritesPage, MovieDetail | Khi giá trị phụ thuộc signal khác | Logic phức tạp hơn nên ở method |
| **Reactive Forms** | Quản lý form input từ TypeScript | SearchBarComponent | Form phức tạp, nhiều fields liên quan | 1 input đơn giản |
| **Router** | SPA navigation | app.routes.ts, RouterLink | Ứng dụng nhiều trang | App 1 trang duy nhất |
| **Lazy Loading** | Giảm initial bundle size | Tất cả 5 routes | Page ít truy cập, feature lớn | Component nhỏ dùng mọi nơi |
| **Route Guard** | Kiểm tra trước khi vào route | validMovieIdGuard | Validate URL params, auth check | Logic nên ở component level |
| **HttpClient** | Gọi HTTP API | MovieService | Lấy data từ server/API | Data local |
| **Interceptor** | Xử lý chung cho mọi HTTP request | movieApiInterceptor | Headers chung, auth tokens, timeout | Logic riêng cho 1 API |
| **@if** | Conditional rendering | HomePage, MovieGrid, MovieDetail, MoviesPage, FavoritesPage | Hiện/ẩn based on condition | Nếu chỉ cần style thay đổi |
| **@for** | List rendering | MovieGrid, SearchBar, MoviesPage | Render danh sách dynamic | Danh sách cố định ngắn (<3 items) |
| **localStorage** | Persist data qua refresh | FavoritesService, DisplayConfigService | User preferences, cached choices | Dữ liệu nhạy cảm, data lớn |

---

## PART 21 — COMMON BEGINNER MISTAKES (Lỗi thường gặp)

### 1. ❌ Đặt mọi thứ vào AppComponent

AppComponent trong project chỉ có 0 dòng logic:
```typescript
export class AppComponent {}
```
Nếu bạn đặt hết danh sách phim, search, favorites, settings vào đây → file khổng lồ, không tái sử dụng được gì.

### 2. ❌ Gọi API trực tiếp từ nhiều components

Trong project, **chỉ MovieService** gọi HttpClient. Components gọi service methods. Nếu mỗi page tự gọi `http.get(...)` → duplicate requests, inconsistent data.

### 3. ❌ Duplicate state

Nếu MoviesPage và FavoritesPage mỗi cái tự lưu riêng danh sách favorites → khi thêm favorite ở 1 trang, trang kia không biết. Project giải quyết bằng FavoritesService singleton.

### 4. ❌ Dùng CSS ẩn thay vì @if

```css
/* ❌ Cách sai */
.hero { display: none; }
```
Component vẫn tồn tại, vẫn chạy, vẫn tốn memory.

```html
<!-- ✅ Cách đúng (đang dùng trong project) -->
@if (displayConfigService.displayConfig().hero) {
  <app-hero />
}
```

### 5. ❌ Tạo service bằng `new`

```typescript
// ❌ KHÔNG LÀM
private movieService = new MovieService();
```
Mất singleton, mất dependency chain. Luôn dùng `inject()`.

### 6. ❌ Quên `track` trong @for

`@for` **bắt buộc** phải có `track`. Nếu quên → Angular báo lỗi compile. Track giúp Angular biết item nào thay đổi → tối ưu DOM updates.

### 7. ❌ Overuse Signals

Không phải mọi biến đều cần là signal. Trong project:
```typescript
protected readonly pageSize = PAGE_SIZE;  // Hằng số → biến thường đủ rồi
private hasLoadedConfiguredSource = false; // Flag nội bộ → không hiện trên UI
```

### 8. ❌ Dùng Route Guard như bảo mật thật

Guard trong project chỉ kiểm tra URL format. **Bất kỳ ai** đều có thể gọi API trực tiếp, bypass guard. Backend phải tự bảo vệ.

### 9. ❌ Lưu secrets ở frontend

Nếu `tmdbApiKey` được hardcode trong `environment.ts`, bất kỳ ai đều có thể mở DevTools → Network tab → thấy API key. Project hiện để `tmdbApiKey: ''` (rỗng) — an toàn.

### 10. ❌ Đặt quá nhiều logic trong template

```html
<!-- ❌ Quá nhiều logic trong template -->
{{ movies.filter(m => m.rating > 8).sort((a,b) => b.rating - a.rating).slice(0,5).length }}
```

```typescript
// ✅ Cách đúng (project dùng computed)
protected readonly topRatedMovies = computed(() => this.movieService.getTopRatedMovies(6));
```

### 11. ❌ Child component trực tiếp sửa parent state

MovieCardComponent **không** trực tiếp gọi `favoritesService.toggleFavorite()`. Thay vào đó:
1. Emit event qua `output()`
2. Parent nhận event
3. Parent gọi service

Điều này giữ MovieCardComponent **tái sử dụng** — nó không biết/quan tâm FavoritesService là gì.

---

## PART 22 — THỨ TỰ ĐỌC CODE ĐỀ XUẤT

### Giai đoạn 1: Hiểu bức tranh tổng thể

| # | File | Chú ý điều gì |
|---|---|---|
| 1 | [index.html](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/index.html) | `<app-root></app-root>` — điểm nhúng Angular vào HTML |
| 2 | [main.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/main.ts) | `bootstrapApplication()` — khởi chạy Angular |
| 3 | [app.config.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/app.config.ts) | `providers` — đăng ký Router, HttpClient, Interceptor |
| 4 | [app.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/app.ts) | Root component — `@Component`, `selector`, `imports` |
| 5 | [app.html](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/app.html) | `<app-navbar />` + `<router-outlet />` — bố cục shell |
| 6 | [app.routes.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/app.routes.ts) | Tất cả routes, `loadComponent`, `canActivate` |

### Giai đoạn 2: Hiểu Models và Data

| # | File | Chú ý điều gì |
|---|---|---|
| 7 | [models/movie.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/models/movie.ts) | `interface Movie`, `MovieGenre` type, `MOVIE_GENRES` constant |
| 8 | [models/display-config.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/models/display-config.ts) | `interface DisplayConfig`, `DEFAULT_DISPLAY_CONFIG` |
| 9 | [data/movies.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/data/movies.ts) | Mock data — 36 phim, tuân theo `Movie` interface |
| 10 | [environments/environment.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/environments/environment.ts) | Data source config, API URLs |

### Giai đoạn 3: Hiểu Services

| # | File | Chú ý điều gì |
|---|---|---|
| 11 | [favorites.service.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/services/favorites.service.ts) | `signal()`, `computed()`, localStorage, `providedIn: 'root'` |
| 12 | [display-config.service.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/services/display-config.service.ts) | Tương tự pattern, `updateSetting()`, `resetToDefaults()` |
| 13 | [movie.service.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/services/movie.service.ts) | HttpClient, Observable, `pipe`, `catchError`, `map`, TMDB mapping, signals |

### Giai đoạn 4: Hiểu Reusable Components (từ nhỏ → lớn)

| # | File | Chú ý điều gì |
|---|---|---|
| 14 | [hero/hero.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/components/hero/hero.ts) + [hero.html](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/components/hero/hero.html) | Component đơn giản nhất — không có input/output, chỉ UI tĩnh + RouterLink |
| 15 | [movie-card/movie-card.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/components/movie-card/movie-card.ts) + [movie-card.html](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/components/movie-card/movie-card.html) | `input()`, `output()`, mọi loại data binding, event handling |
| 16 | [movie-grid/movie-grid.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/components/movie-grid/movie-grid.ts) + [movie-grid.html](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/components/movie-grid/movie-grid.html) | `@for`, `@if/@else if/@else`, event forwarding, loading/empty/error states |
| 17 | [navbar/navbar.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/components/navbar/navbar.ts) + [navbar.html](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/components/navbar/navbar.html) | RouterLink, RouterLinkActive, inject service, interpolation with computed |
| 18 | [search-bar/search-bar.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/components/search-bar/search-bar.ts) + [search-bar.html](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/components/search-bar/search-bar.html) | Reactive Forms, FormGroup, FormControl, valueChanges, output |
| 19 | [display-settings/display-settings.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/components/display-settings/display-settings.ts) + [display-settings.html](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/components/display-settings/display-settings.html) | input/output pattern cho settings, checkbox binding |

### Giai đoạn 5: Hiểu Pages

| # | File | Chú ý điều gì |
|---|---|---|
| 20 | [home/home-page.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/pages/home/home-page.ts) + [home-page.html](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/pages/home/home-page.html) | `@if` cho configurable blocks, inject 3 services, `computed()` |
| 21 | [movies/movies-page.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/pages/movies/movies-page.ts) + [movies-page.html](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/pages/movies/movies-page.html) | Signal chain (filters → filteredMovies → totalPages → visibleMovies), pagination |
| 22 | [movie-detail/movie-detail-page.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/pages/movie-detail/movie-detail-page.ts) + [movie-detail-page.html](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/pages/movie-detail/movie-detail-page.html) | ActivatedRoute, route params, `@if/@else if/@else` với `as` |
| 23 | [favorites/favorites-page.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/pages/favorites/favorites-page.ts) + [favorites-page.html](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/pages/favorites/favorites-page.html) | computed derivation từ 2 services |
| 24 | [settings/settings-page.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/pages/settings/settings-page.ts) + [settings-page.html](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/pages/settings/settings-page.html) | Luồng hoàn chỉnh: Page → Component → Service |

### Giai đoạn 6: Hiểu Infrastructure

| # | File | Chú ý điều gì |
|---|---|---|
| 25 | [guards/valid-movie-id.guard.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/guards/valid-movie-id.guard.ts) | CanActivateFn, URL validation, redirect |
| 26 | [interceptors/movie-api.interceptor.ts](file:///c:/Users/Admin/Desktop/Cuowngf/Intern/Angular/movie-explorer/src/app/interceptors/movie-api.interceptor.ts) | HttpInterceptorFn, headers, conditional auth, timeout |

---

> [!TIP]
> **Cách học hiệu quả nhất:** Sau khi đọc tài liệu này, mở project trong IDE, chạy `ng serve`, và **theo dõi luồng data** bằng tay:
> 1. Click "Save" trên một MovieCard
> 2. Trace: movie-card.html `(click)` → movie-card.ts `toggleFavorite()` → movie-grid.html `(favoriteToggled)` → page.ts `toggleFavorite()` → favorites.service.ts `toggleFavorite()` → signal thay đổi → navbar.html `{{ favoriteCount() }}` cập nhật
>
> Khi bạn có thể trace luồng data từ user click → service → template update mà **không cần tài liệu**, bạn đã hiểu Angular.

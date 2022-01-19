# Section 4: Master Project: Setting Up E-Commerce Project

Property: December 8, 2021 1:48 PM
Tags: React Basic

Roadmap:

- [x]  Project Overview
- [x]  E-Commerce Homepage + SASS setup
- [x]  Project Files + Modules
- [x]  Project Component Architecture
- [x]  Homepage and Directory Components
- [x]  Styling Menu Items Components
- [x]  Updating Packages + Latest Version of React

### E-Commerce Homepage + SASS

Create Project:

```bash
npx create-react-app e-commerce
```

Additional Package (Sass):

```bash
yarn add sass
```

Create Files (Components and Styles):

- homepage.component.jsx
- homepage.style.scss

Layout:

![Untitled](https://i.ibb.co/BtC2wWK/Untitled.png)

`create-react-app` digunakan untuk membuat seperti IDE Environment.

### Project Files + Modules

Packages dalam `node_modules` hanya digunakan ketika dibutuhkan saja Packages yang tidak digunakan tidak akan dimasukan kedalam folder build ketika dibuild.

`yarn.lock` atau `package-lock.json` mengizinkan menginstall packages degan versi yang sama pada komputer yang digunakan.

`serviceWorker.js` digunakan untuk PWA (Progressive Web App).

### Project Component Architecture

1. Decide on Components
2. Decide the State and where it lives
3. What changes when state changes

### Homepage and Directory Components

Pisahkan komponen kedalam foldernya masing-masing dan membuat struktur folder sebagai berikut:

- components → berisi komponen-komponen
- pages → berisi halaman

Construct props dengan menggunakan {} (currly brackets).

### Styling Menu Item Components

- Setting up fonts and animations

### Updating Packages + Latest Version of React

Delete lock file and run `npm update -D`, fix the vulnerabilities using `npx audit fix.`



# Section 5: Master Project: React Router and Routing

Property: December 7, 2021 10:23 AM
Tags: React Router

**Roadmap:**

- [x]  Routing in React
- [x]  Routing in Project
- [x]  React Router DOM
- [x]  withRouter()

### Routing in React

React tidak menyediakan routing (default yang digunakan adalah SPA), `react-router` merupakan library standar yang sering digunakan.

HistoryAPI disediakan browser ketika link/url berubah.

### Routing in Our Project

Routing → ketika memiliki lebih dari 1 halaman, harus ada yang merender berdasarkan URL yang dikirimkan.  

`react-router-dom` paling banyak digunakan untuk mengehandle routing.

Cara menginstall

```bash
yarn add react-router-dom
```

Penggunaan → terdapat perbedaan pada penggunaan react-router-dom versi 6 diantaranya adalah sebagai berikut:

- `Switch` diganti menjadi `Routes`
- Atribut `component` menjadi `element` dan value berupa contoh berikut: `element={<Element />}`
- Tidak perlu lagi menggunakan `exact`
- Tidak ada lagi class aktif otomatis, harus dibuat secara manual dengan contoh sebagai berikut:
    
    ```jsx
    `<NavLink className={(navData) => navData.isActive ? "active" : "" } to="/profile" />
    ```
    
- Tidak ada lagi `redirect` tetapi diubah menggunakan metode `useNavigate` dengan contoh sebagai berikut:
    
    ```jsx
    import { useNavigate } from 'react-router-dom'
    
    const Products = () => {
    	const navigate = useNavigate()
    	
    	const handleClick = () => {
    		navigate('/home')
    	}
    	
    	return (
    		<div>
    			<button onClick={() => handleClick()}>Go to Home</button>
    		</div>
    	)
    }
    ```
    
- Penggunaan parameter pada router menggunakan `:paramName`, contohnya adalah sebagai berikut:
    
    ```jsx
    <Route path='products/:productId' component={<ProductDetail />} />
    ```
    

> Force versioning using `resolutions`
> 

### React Router DOM

**Instalasi**

```bash
yarn add react-router-dom
```

**Konfigurasi Routes**

```jsx
import {
	BrowserRouter,
	Routes,
	Route
} from 'react-router-dom'

import About from './pages/About'
import Contact from './pages/Contact'

const Home = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/path-to' element={<About />} />
				<Route path='/path-to' element={<Contact />} />
				<Route path='/blogs' element={<Blogs />}>
					<Route path=':blogId' element={<Blog />} />
					<Route path='/add' element={<Blog />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}
```

- **BrowserRouter** membungkus semua fungsionalitas routing.
- **Routes** wrapper route yang berisi path dan komponen.
- **Route** berisi path dan elemen yang akan ditampilkan ketika path yang didefinisi sesuai dengan path yang sedang diakses.
    
    
    | * | Not Match |
    | --- | --- |
    | :id | Parameter |

**useLocation**

Untuk mendapatkan lokasi yang sedang diakses

```jsx
import {
	useLocation
} from "react-router-dom";

let location = useLocation();
```

**useQuery**

Untuk mendapatkan parameter berupa query

```bash
import {
	useQuery
} from 'react-router-dom'

const App = () => {
	let query = useQuery()
	
	return (
		<div>
      <div>
        <h2>Accounts</h2>
        <ul>
          <li>
            <Link to="/account?name=netflix">Netflix</Link>
          </li>
          <li>
            <Link to="/account?name=zillow-group">Zillow Group</Link>
          </li>
          <li>
            <Link to="/account?name=yahoo">Yahoo</Link>
          </li>
          <li>
            <Link to="/account?name=modus-create">Modus Create</Link>
          </li>
        </ul>

        <Child name={query.get("name")} />
      </div>
    </div>
	)
}
```

**useParams**

Mendapatkan parameter berupa uri

```jsx
import {
	useParams
} from 'react-router-dom'

const App = () => {
	let { id } = useParams()
	
	return (
		<div>
      <div>
        <h2>Accounts</h2>
        <ul>
					<li>
            <Link to="/netflix">Netflix</Link>
          </li>
          <li>
            <Link to="/zillow-group">Zillow Group</Link>
          </li>
          <li>
            <Link to="/yahoo">Yahoo</Link>
          </li>
          <li>
            <Link to="/modus-create">Modus Create</Link>
          </li>
        </ul>

				<div>The parameter is { id }</div>
      </div>
    </div>
	)
}
```

**Link**

Mengubah URL (pindah halaman)

```jsx
import { Link } from 'react-router-dom'

const App = () => {
	return (
		<div>
			<Link to="/to-page">Pindah ke halaman ...</Link>
		</div>
	)
}
```

**Custom Link**

Membuat custom link, melakukan pengkondisian pada kejadian apabila aktif

```jsx
import { useRouteMatch } from 'react-router-dom'

<OldSchoolMenuLink activeOnlyWhenExact={true} to="/" label="Home" />
<OldSchoolMenuLink to="/about" label="About" />

function OldSchoolMenuLink({ label, to, activeOnlyWhenExact }) {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact
  });

  return (
    <div className={match ? "active" : ""}>
      {match && "> "}
      <Link to={to}>{label}</Link>
    </div>
  );
}
```

<aside>
⚠️ `useHistory` sudah diganti dengan `useNavigate` pada react-router-dom versi 6

</aside>

**Spread Props**

Ketika value dan props memiliki key yang sama

```jsx
sections: [
    {
        title: 'hats',
        imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
        id: 1,
        linkUrl: 'shop/hats'
    },
    {
        title: 'jackets',
        imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
        id: 2,
        linkUrl: 'shop/jackets'
    }
]
```

Instead of:

```jsx
<div className="directory-menu">
    {this.state.sections.map(section => (
        <MenuItem key={section.id} title={section.title} imageUrl={section.imageUrl} size={section.size} />
    ))}
</div>
```

You can use

```jsx
<div className="directory-menu">
    {this.state.sections.map(({ id, ...otherSectionProps }) => (
        <MenuItem key={id} {...otherSectionProps} />
    ))}
</div>
```



# Section 6 - Master Project: Forms + Components

Property: December 13, 2021 11:02 AM
Tags: Components

**Importing SVG File**

Memanggil file svg sebagai komponen

```jsx
import { ReactComponent as File } from '../assets/Gambar.svg'

const App = () => {
	return (
		<div>
			<File />
		</div>
	)
}
```

For more information:

[https://facebook.github.io/create-react-app/docs/adding-images-fonts-and-files](https://facebook.github.io/create-react-app/docs/adding-images-fonts-and-files)

**Create Component**

Membuat komponen yang sering digunakan kembali didalam projek juga dibutuhkan customization. Contoh component:

- Button
- Input


# Section 7: Master Project Firebase + User Authentication

Property: December 14, 2021 10:01 AM

**Firebase**

Storage (mostly authentication)

---

![Untitled](https://i.ibb.co/L9BVCfs/Untitled.png)

![Untitled](https://i.ibb.co/6RHhhN1/Untitled-1.png)

---

**Database**

Store important data in app

**Creating Database in Firebase**

- Sign in with google account
- Create Project
- Go to `Project Overview`
    
    ![Untitled](https://i.ibb.co/VxNCzvS/Untitled-2.png)
    
- Create Database for Web (Click icons like this "</>")
- Go to project and add firebase package
    
    ```bash
    yarn add firebase
    ```
    
- Read more about it, on documentation: [https://firebase.google.com/docs/reference/js/](https://firebase.google.com/docs/reference/js/)

**Firebase Configuration**

```jsx
// src/firebase/firebase.utils.js

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyBhC26IThNs3luJIc1J-nk5qvPKbohFrmM",
    authDomain: "nothing-11f79.firebaseapp.com",
    projectId: "nothing-11f79",
    storageBucket: "nothing-11f79.appspot.com",
    messagingSenderId: "1031477682904",
    appId: "1:1031477682904:web:7e52ac59d7c49d9c7cadad",
    measurementId: "G-64RPGWR96E"
};

firebase.initializeApp(config)
```

**Collection**

A group of collection (data), it stores second type of date called documents. It has properties that can also connected into another collection.

**Get Collection Using Firestore**

```jsx
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

const firestore = firebase.firestore()

firestore.collection('users').doc('293jlskfj092').collection('cartItems').doc('lkadfjalsdkfja')
// or
firestore.doc('users/alskfj233jrije/cartItems/29ldfasdfiajsdf')
firestore.collection('users/alskfj233jrije/cartItems')
```

**QueryReference and QuerySnapshot**

A query is a request we make to Firestore to give us something from the database.

> Active request → query
> 

Firestore returns two types of objects: references and snapshots. Of these objects, they can be either Document or Collection versions.

Firestore will always return us these objects, even if nothing exists from that query.

**QueryReference**

A queryReference object is an object that represents the "current" place in the database that we are querying.

We get them by calling it either:

```jsx
firestore.doc('/users/:userId');
firestore.collections('/users');
```

The queryReference object does not have the actual data of the collection or document. It instead has properties that tell us details about it, or the method to get the Snapshot object which gives us the data we are looking for.

**DocumentReference vs CollectionReference**

We use documentRef objects to perform our CRUD methods (create, retrieve, update, delete). The documentRef methods are .set(), .sget(), .update() and .delete() respectively.

We can also add documents to collections using the collectionRef object using the .add() methods // collectionRef.add({ //value: prop })

We get the snapshotObject from the referenceObject using .get() method. ie. documentRef.get() or collection.get()

documentRef returns a documentSnapshot object.

collectionRef returns a querySnapshot object.

**DocumentSnapshot**

We get a documentSnapshot object from our documentReference object.

The documentSnapshot allows checking if a document exists at this query using the `.exists` property which returns a boolean.

We can also get the actual properties on the object by calling the `.data()` method, which returns us a JSON object of the document.

<aside>
❓ Whenever we call the `onAuthStateChanged()` or `onSnapshot()` methods from our `auth` library or `referenceObject`, we get back a function that lets us unsubscribe from the listener we just instantiated. Which lifecycle method should we use to call that unsubscribe method in?
a. componentDidMount
**b. componentWillUnmount**
c. shouldComponentUpdate

</aside>
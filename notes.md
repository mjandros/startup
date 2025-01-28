# CS 260 Notes

[My startup](https://simon.cs260.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## Git Basics

After making changes from terminal:
```
git add --all
git commit -m "message"
git push
```

## HTML Basics

Anchor (URL):
```
<a href = "https://linktosite.com">DisplayText</a>
```
Image:
```
<img src = "path/to/img.png" alt = "Alt Text"/>
<img src = "https://linktoimage.com" alt = "Alt Text"/>
```
List:
```
<p>List Title</p>
<ul>
    <li>Element 1></li>
    <li>Element 2></li>
</ul>
```
Table:
```
<table>
    <thead>
        <tr>
            <th>Header 1</th>
            <th>Header 2</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Entry</td>
            <td>Entry</td>
        </tr>
        <tr>
            <td>Entry</td>
            <td>Entry</td>
        </tr>
    </tbody>
</table>
```
Other:
```
<h1>Title Text</h1>
<header> ... </header>
<body> ... </body>
<section> ... </section>
<p>text</p>
<main> ... </main>
<aside> ... </aside>
<footer> ... </footer
```

## HTML Input

Label:
```
<label for="idOfInput">Label Text</label>
```
Input:
```
<input type="inputType" name="inputName" id="inputID" value="initialValue" />
```
Types:
| Type             | Unique Attributes             |
| ---------------- | ----------------------------- |
| `text`           | placeholder, required pattern |
| `password`       |                               |
| `email`          |                               |
| `tel`            | placeholder, pattern          |
| `url`            |                               |
| `number`         | min, max, step                |
| `checkbox`       | checked                       |
| `radio`          | checked                       |
| `range`          | min, max, step                |
| `date`           |                               |
| `datetime-local` |                               |
| `month`          |                               |
| `week`           |                               |
| `color`          |                               |
| `file`           |                               |
| `submit`         |                               |
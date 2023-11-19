// قم بإنشاء مصفوفة ثنائية الأبعاد لتخزين معلومات الكتب
const books = [];

// دالة لإضافة كتاب جديد
function addBook(bookId, bookTitle, author, price, quantity) {
    const book = [bookId, bookTitle, author, price, quantity];
    books.push(book);
}


// دالة لتعديل معلومات كتاب
function updateBook(bookId, bookTitle, author, price, quantity) {
    for (let i = 0; i < books.length; i++) {
        if (books[i][0] === bookId) {
            books[i] = [bookId, bookTitle, author, price, quantity];
            break;
        }
    }
}

// دالة لحذف كتاب
function deleteBook(bookId) {
    for (let i = 0; i < books.length; i++) {
        if (books[i][0] === bookId) {
            books.splice(i, 1);
            break;
        }
    }
}

// دالة لعرض معلومات جميع الكتب
function displayBooks() {

    for (let i = 0; i < books.length; i++) {
        console.log("Book Id: ", books[i][0]);
        console.log("Book Title: ", books[i][1]);
        console.log("Author: ", books[i][2]);
        console.log("Price: ", books[i][3]);
        console.log("Quantity: ", books[i][4]);
        console.log("-----------------------------");
    }
}

// دالة للاستعلام عن كتاب بناءً على الرقم أو العنوان أو اسم المؤلف
function queryBooks(attribute, value) {
    const results = [];
    for (let i = 0; i < books.length; i++) {
        if (books[i][attribute] === value) {
            results.push(books[i]);
        }
    }
    return results;
}

// دالة لإجراء عملية البيع وإصدار الفاتورة
function sellBook(bookTitle, quantity, balance) {
    let availableQuantity = 0;

    // البحث عن الكتاب المُراد بيعه
    for (let i = 0; i < books.length; i++) {
        if (books[i][1] === bookTitle) {
            availableQuantity = books[i][4];
            break;
        }
    }

    // التحقق من توفر الكتاب والكمية المطلوبة
    if (availableQuantity === 0) {
        console.log("The book is out of stock.");
        return;
    }
    if (quantity > availableQuantity) {
        console.log("The requested quantity is not available in stock.");
        return;
    }

    // التحقق من كفاية الرصيد
    const totalPrice = findBookPrice(bookTitle) * quantity;
    if (balance < totalPrice) {
        console.log("The balance is insufficient to purchase the required quantity.");
        return;
    }

    // تحديث المخزن وإصدار الفاتورة
    for (let i = 0; i < books.length; i++) {
        if (books[i][1] === bookTitle) {
            books[i][4] -= quantity;
            break;
        }
    }

    console.log("Book sold successfully!");
    console.log("Invoice:");
    console.log("Book Title: ", bookTitle);
    console.log("Quantity: ", quantity);
    console.log("Total Amount: ", totalPrice);
}

// دالة للعثور على سعر الكتاب بناءً على عنوان الكتاب
function findBookPrice(bookTitle) {
    for (let i = 0; i < books.length; i++) {
        if (books[i][1] === bookTitle) {
            return books[i][3];
        }
    }
    return 0;
}
//add 5 books
addBook(1, "Start with why", "Simon Sinek", 80.0, 13);
addBook(2, "But how do it know", "J. Clark Scott", 59.9, 22);
addBook(3, "Clean Code", "Robert Cecil Martin", 50.0, 5);
addBook(4, "Zero to One", "Peter Thiel", 45.0, 12);
addBook(5, "You don't know JS", "Kyle Simpson", 39.9, 9);
console.log("Books information");
displayBooks();

console.log("Update Book 1 Quantity");
updateBook(1, "Start with why", "Simon Sinek", 80.0, 18)

sellBook("Clean Code",5,400);
sellBook("Start with why", 20, 1000);
sellBook("Start with why", 10, 500);


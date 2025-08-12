import "./App.css";

function App() {
  const myName = "Đạt Trần";
  const courses = ["HTML", "CSS", "JavaScript", "React"];

  const people = [
    { name: "Jack", age: 50 },
    { name: "Michael", age: 9 },
    { name: "John", age: 40 },
    { name: "Ann", age: 19 },
    { name: "Elisabeth", age: 16 },
  ];
  const isTeenager = (p) => p.age >= 10 && p.age <= 20;
  const firstTeen = people.find(isTeenager);
  const allTeens = people.filter(isTeenager);
  const everyTeen = people.every(isTeenager);
  const someTeen = people.some(isTeenager);

  const array = [1, 2, 3, 4];
  const sum = array.reduce((acc, cur) => acc + cur, 0);
  const product = array.reduce((acc, cur) => acc * cur, 1);

  const companies = [
    { name: "Company One", category: "Finance", start: 1981, end: 2004 },
    { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
    { name: "Company Three", category: "Auto", start: 1999, end: 2007 },
    { name: "Company Four", category: "Retail", start: 1989, end: 2010 },
    { name: "Company Five", category: "Technology", start: 2009, end: 2014 },
    { name: "Company Six", category: "Finance", start: 1987, end: 2010 },
    { name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
    { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
    { name: "Company Nine", category: "Retail", start: 1981, end: 1989 },
  ];
  const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];

  const retailCompanies = companies
    .filter((c) => c.category === "Retail")
    .map((c) => ({ ...c, start: c.start + 1 }));

  const sortedCompanies = [...companies].sort((a, b) => a.end - b.end);
  const sortedAges = [...ages].sort((a, b) => b - a);
  const totalAges = ages.reduce((acc, cur) => acc + cur, 0);

  const person = { name: "Costas", address: { street: "Lalaland 12" } };
  const { street } = person.address;

  const handlePromise = () => {
    const promise = new Promise((resolve, reject) => {
      const num = Math.floor(Math.random() * 10) + 1;
      if (num > 5) {
        resolve(num);
      } else {
        reject("Error: Number <= 5");
      }
    });
    promise.then((res) => alert(`Number: ${res}`)).catch((err) => alert(err));
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-brand">React Exercises</div>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Courses</li>
        </ul>
      </nav>

      <div className="container">
        <div className="card">
          <h1>Hello React</h1>
          <p>My name is {myName}</p>
        </div>

        <div className="card">
          <h2>Courses</h2>
          <ul>
            {courses.map((course, i) => (
              <li key={i}>{course}</li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h2>People Filter</h2>
          <p>First Teenager: {firstTeen ? firstTeen.name : "None"}</p>
          <p>All Teenagers: {allTeens.map((p) => p.name).join(", ")}</p>
          <p>Every person is teenager? {everyTeen ? "Yes" : "No"}</p>
          <p>Any teenager? {someTeen ? "Yes" : "No"}</p>
        </div>

        <div className="card">
          <h2>Array Reduce</h2>
          <p>Sum: {sum}</p>
          <p>Product: {product}</p>
        </div>

        <div className="card">
          <h2>Companies</h2>
          <ul>
            {companies.map((c, i) => (
              <li key={i}>{c.name}</li>
            ))}
          </ul>
          <h3>Retail Companies (+1 start year)</h3>
          <ul>
            {retailCompanies.map((c, i) => (
              <li key={i}>
                {c.name} - {c.category} ({c.start} - {c.end})
              </li>
            ))}
          </ul>
          <p>
            Sorted by End Year: {sortedCompanies.map((c) => c.name).join(", ")}
          </p>
          <p>Sorted Ages Desc: {sortedAges.join(", ")}</p>
          <p>Total Ages Sum: {totalAges}</p>
        </div>

        <div className="card">
          <h2>Person Street</h2>
          <p>Street: {street}</p>
        </div>

        <div className="card">
          <h2>Promise Example</h2>
          <button onClick={handlePromise}>Generate Number</button>
        </div>
      </div>
    </>
  );
}

export default App;

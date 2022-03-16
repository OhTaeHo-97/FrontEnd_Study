console.log("안녕하세요");

const student = {
    apple : "김사과",
    banana : "반하나",
    orange : "오렌지"
}

console.log(student);
const{apple, banana, orange} = student;
// 객체 내애서 키값을 통해 값을 넣어주겠다(student를 분해해서 apple에는 김사과 라는 value 값을 빼온 것)
// 객체 -> 여러 개의 데이터가 담겨야 됨
// 객체를 쪼개서 하나하나로 만들어낸 것
// key값으로 가져와야 함

console.log(apple);
console.log(banana);
console.log(orange);

const user = ["김사과", "반하나", "오렌지"];

// 배열에 대해서는 index에 맞춰서 가져오므로 우리가 이름을 정할 수 있음
const [kim, ban, oh] = user;
console.log(kim);
console.log(ban);
console.log(oh);

const dog = {
    name: "루시",
    age : 11,
    weight: 3.5
}

function print({name, age, weight}) {
    console.log(`
        우리집 강아지 이름은 ${name}이고 나이는 ${age}살이며 몸무게는 ${weight}kg 입니다.
    `);
}

print(dog);
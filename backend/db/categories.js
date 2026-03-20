import { v4 as uuid } from "uuid";

export const categories = [
  {
    _id: uuid(),
    categoryName: "Indian",
    url: "https://img.freepik.com/free-photo/top-view-food-frame-with-copy-space_23-2148723447.jpg?w=1380&t=st=1684264103~exp=1684264703~hmac=102fefc3609b9e1829dbbd2b76f509b0a82f4ef0180564825c5f53a6fda310cc",

    description:
      "Delicious and flavorful dishes from India, known for their rich spices and diverse regional cuisines.",
  },
  {
    _id: uuid(),
    categoryName: "Chinese",
    url: "https://img.freepik.com/free-photo/top-view-delicious-noodles-concept_23-2148773780.jpg?w=1380&t=st=1684264197~exp=1684264797~hmac=084946c4d932691a4084474c113135ea79bb6462df830926ae60ea64f4ee9a81",
    description:
      "Authentic Chinese cuisine offering a variety of flavors and cooking styles, including Cantonese, Sichuan, and more.",
  },
  {
    _id: uuid(),
    categoryName: "Italian",
    url: "https://img.freepik.com/free-photo/penne-pasta-tomato-sauce-with-chicken-tomatoes-wooden-table_2829-19744.jpg?w=1380&t=st=1684264264~exp=1684264864~hmac=061309d0fb49b9884ae8dfb7f83c58dca34cc4b6571a4eaf2989e99f0e309939",
    description:
      "Classic Italian dishes with fresh ingredients, pasta, pizza, and a range of mouthwatering flavors from different regions of Italy.",
  },
];

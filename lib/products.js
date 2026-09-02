// Single source of truth for flavour/product data. Shared by the Home page
// flavour cards (Flavours.js) and the About page's detailed product
// sections (ProductsShowcase.js) so the two can never drift out of sync.
//
// `id` doubles as the URL-safe anchor slug used to link a Home card
// straight to its matching About page section, e.g. /about#mango.
export const PRODUCTS = [
  {
    id: "mango",
    name: "Mango",
    shortDescription: "Rich, creamy, and bursting with real mango pulp.",
    image: "/images/flavours/mango.svg",
    bg: "bg-butter",
    description:
      "Come summer, Mango is the flavour everyone in the family reaches for first. We fold real mango pulp into a rich, creamy base, so every scoop carries that unmistakable ripe, sun-warmed sweetness rather than an artificial fruit punch. The texture stays smooth and dense, never icy, which means it holds its shape nicely in a cone on a hot afternoon. It's an easy favourite for kids because it tastes like the mangoes they already love, and it's just as popular with adults chasing a nostalgic, home-style treat. If you only try one Surbhi flavour this season, this playful, fruity classic is a safe, joyful bet.",
  },
  {
    id: "vanilla",
    name: "Vanilla",
    shortDescription: "Classic and smooth, with real vanilla bean flecks.",
    image: "/images/flavours/vanilla.svg",
    bg: "bg-sky",
    description:
      "Vanilla often gets called ‘plain,’ but ours is anything but. We use real vanilla bean flecks stirred through a smooth, slow-churned base, giving it a warm, slightly floral aroma and a flavour that's rounded rather than flat or sugary. It's the flavour that pairs with everything — a slice of cake, a bowl of fruit, or simply a cone on its own — which makes it the one most families keep coming back to for everyday treats. Because the recipe leans on quality dairy and real vanilla rather than shortcuts, the taste feels honest and comforting. For anyone who wants classic ice cream done properly, this is it.",
  },
  {
    id: "butterscotch",
    name: "Butterscotch",
    shortDescription: "Buttery caramel swirls with crunchy toffee bits.",
    image: "/images/flavours/butterscotch.svg",
    bg: "bg-butter",
    description:
      "Butterscotch is the flavour for anyone who wants a little indulgence in every bite. We swirl buttery caramel through the base and fold in crunchy toffee bits, so you get a soft, creamy scoop with pockets of crackly sweetness throughout. It's richer and more dessert-like than our fruitier flavours, which makes it a favourite for birthdays, celebrations, or simply ending a meal on a high note. The contrast between the smooth caramel ice cream and the crunchy toffee pieces keeps every spoonful interesting rather than one-note. If you enjoy caramel desserts or have a sweet tooth for something a bit more indulgent, this one's worth ordering.",
  },
  {
    id: "blueberry",
    name: "Blueberry",
    shortDescription: "Sweet-tart blueberries in a velvety, fruity swirl.",
    image: "/images/flavours/blueberry.svg",
    bg: "bg-sky",
    description:
      "Blueberry brings a sweet-tart brightness that's a little different from our other flavours, with a fruity swirl running through a velvety, creamy base. The berry flavour is bold without being overpowering, balancing sweetness with just enough tang to keep it refreshing rather than heavy. Its deep, vibrant colour and swirled texture also make it a fun, eye-catching choice for kids' parties or anyone who likes their ice cream a little more playful. It's a good pick for anyone who finds classic fruit flavours like strawberry a bit too familiar and wants to try something with a bit more character, while still keeping things light and family-friendly.",
  },
];

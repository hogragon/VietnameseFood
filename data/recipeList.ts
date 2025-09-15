import type { Recipe } from '../types';

interface RecipeTranslation {
  en: Recipe;
  vi: Recipe;
}

// A collection of sample recipes to be used locally, removing the need for an API call.
// The key is the English name of the dish, matching the 'en' property in foodList.ts.
export const VIETNAMESE_RECIPES: Record<string, RecipeTranslation> = {
  "Pho Bo (Beef Noodle Soup)": {
    en: {
      ingredients: [
        "1 kg beef bones",
        "500g beef brisket",
        "2 onions, charred",
        "5cm ginger, charred",
        "1 cinnamon stick",
        "2 star anise",
        "4 cloves",
        "1 tbsp coriander seeds",
        "1 tbsp fennel seeds",
        "Fish sauce, to taste",
        "Sugar, to taste",
        "500g fresh pho noodles",
        "200g beef sirloin, thinly sliced",
        "Garnishes: bean sprouts, Thai basil, cilantro, lime wedges, sliced chili"
      ],
      instructions: [
        "Parboil beef bones, then rinse. Place in a large stockpot with 8-10 cups of water.",
        "Add brisket, charred onion, and ginger. Add toasted spices (cinnamon, star anise, etc.).",
        "Simmer for at least 3-4 hours, skimming impurities. The longer, the better.",
        "Remove the brisket when tender, let it cool, and slice thinly.",
        "Season the broth with fish sauce and a little sugar.",
        "Cook pho noodles according to package directions.",
        "To serve, place noodles in a bowl, top with sliced brisket, raw sirloin, and pour hot broth over it. The hot broth will cook the raw beef.",
        "Serve immediately with a plate of fresh garnishes."
      ]
    },
    vi: {
      ingredients: [
        "1 kg xương bò",
        "500g thịt nạm bò",
        "2 củ hành tây, nướng",
        "5cm gừng, nướng",
        "1 thanh quế",
        "2 hoa hồi",
        "4 nụ đinh hương",
        "1 muỗng canh hạt ngò",
        "1 muỗng canh hạt tiểu hồi",
        "Nước mắm, nếm vừa ăn",
        "Đường, nếm vừa ăn",
        "500g bánh phở tươi",
        "200g thăn bò, thái mỏng",
        "Rau ăn kèm: giá đỗ, húng quế, ngò gai, chanh, ớt thái lát"
      ],
      instructions: [
        "Chần sơ xương bò, sau đó rửa sạch. Cho vào nồi lớn với 8-10 cốc nước.",
        "Thêm thịt nạm, hành tây và gừng đã nướng. Thêm các loại gia vị đã rang (quế, hồi, v.v.).",
        "Hầm ít nhất 3-4 giờ, vớt bọt. Hầm càng lâu càng ngon.",
        "Vớt thịt nạm ra khi mềm, để nguội và thái mỏng.",
        "Nêm nước dùng với nước mắm và một ít đường.",
        "Trụng bánh phở theo hướng dẫn trên bao bì.",
        "Khi ăn, cho bánh phở vào tô, xếp thịt nạm, thăn bò sống lên trên rồi chan nước dùng nóng hổi. Nước dùng nóng sẽ làm chín thịt bò sống.",
        "Dùng ngay với đĩa rau thơm ăn kèm."
      ]
    }
  },
  "Banh Mi (Vietnamese Sandwich)": {
    en: {
      ingredients: [
        "1 Vietnamese baguette",
        "100g grilled pork (or cold cuts like cha lua)",
        "Pâté",
        "Mayonnaise",
        "Pickled carrots and daikon",
        "Cucumber strips",
        "Cilantro sprigs",
        "Sliced jalapeños or chili",
        "Maggi seasoning sauce or soy sauce"
      ],
      instructions: [
        "Slice the baguette lengthwise, leaving one side hinged.",
        "Toast the baguette until crispy.",
        "Spread a thin layer of pâté on one side and mayonnaise on the other.",
        "Layer the grilled pork or cold cuts inside.",
        "Add pickled carrots and daikon, cucumber strips, cilantro, and chili.",
        "Drizzle with a little Maggi seasoning sauce.",
        "Press the sandwich closed and serve immediately."
      ]
    },
    vi: {
      ingredients: [
        "1 ổ bánh mì Việt Nam",
        "100g thịt heo nướng (hoặc chả lụa)",
        "Pa-tê",
        "Sốt mayonnaise",
        "Đồ chua (cà rốt, củ cải)",
        "Dưa leo thái sợi",
        "Ngò rí",
        "Ớt thái lát",
        "Nước tương Maggi"
      ],
      instructions: [
        "Xẻ dọc ổ bánh mì, nhưng không cắt đứt hẳn.",
        "Nướng bánh mì cho giòn.",
        "Phết một lớp mỏng pa-tê lên một mặt và mayonnaise lên mặt còn lại.",
        "Xếp thịt nướng hoặc chả lụa vào trong.",
        "Thêm đồ chua, dưa leo, ngò rí và ớt.",
        "Rưới một ít nước tương Maggi.",
        "Kẹp bánh mì lại và dùng ngay."
      ]
    }
  },
  "Bun Cha (Grilled Pork & Noodle)": {
      en: {
        ingredients: [
          "500g pork belly, thinly sliced",
          "500g ground pork",
          "Marinade: fish sauce, sugar, black pepper, shallots, garlic",
          "Dipping Sauce: fish sauce, sugar, vinegar, water, garlic, chili",
          "1kg fresh rice vermicelli noodles",
          "Lettuce, perilla leaves, mint, bean sprouts",
          "Pickled papaya and carrots"
        ],
        instructions: [
          "Marinate the pork belly and ground pork (formed into patties) for at least 30 minutes.",
          "Grill the pork belly slices and patties over charcoal until cooked and slightly charred.",
          "Prepare the dipping sauce by mixing all sauce ingredients. It should be a balance of sweet, sour, salty, and spicy.",
          "Cook the vermicelli noodles as per package instructions.",
          "To serve, place the grilled pork into bowls and pour over the dipping sauce. Add some pickled papaya and carrots.",
          "Serve with a platter of fresh herbs, lettuce, and a side of vermicelli noodles. Diners dip the noodles and herbs into the pork and sauce bowl."
        ]
      },
      vi: {
        ingredients: [
          "500g thịt ba rọi, thái mỏng",
          "500g thịt heo xay",
          "Gia vị ướp: nước mắm, đường, tiêu đen, hành khô, tỏi",
          "Nước chấm: nước mắm, đường, giấm, nước, tỏi, ớt",
          "1kg bún tươi",
          "Xà lách, lá tía tô, húng bạc hà, giá đỗ",
          "Đu đủ và cà rốt ngâm chua"
        ],
        instructions: [
          "Ướp thịt ba rọi và thịt heo xay (viên thành chả) ít nhất 30 phút.",
          "Nướng thịt ba rọi và chả viên trên than hoa cho đến khi chín và hơi cháy cạnh.",
          "Pha nước chấm bằng cách trộn đều tất cả các nguyên liệu. Nước chấm cần có vị chua, cay, mặn, ngọt cân bằng.",
          "Trụng bún theo hướng dẫn trên bao bì.",
          "Khi ăn, cho chả nướng vào bát và chan nước chấm. Thêm một ít đu đủ, cà rốt ngâm chua.",
          "Dọn ăn kèm với đĩa rau sống và bún. Người ăn gắp bún và rau nhúng vào bát chả."
        ]
      }
  }
};

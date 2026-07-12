const dotenv = require("dotenv");
const prisma = require("./lib/prisma");

// [환경 설정 불러오기]
dotenv.config();

// [테스트용 데이터 리스트]
const testProduct = [
  {
    name: "빈티지 가죽 가방",
    price: 55000,
    description: "관리가 잘 된 빈티지 가방입니다. 가죽 상태 아주 좋아요.",
  },
  {
    name: "기계식 키보드",
    price: 120000,
    description: "청축 키보드입니다. 타건감이 아주 좋습니다.",
  },
  {
    name: "스마트 워치",
    price: 210000,
    description: "최신형 스마트 워치입니다. 박스 포함 풀구성입니다.",
  },
];

const testArticles = [
  {
    title: "오늘 날씨가 너무 좋네요!",
    content: "산책하기 딱 좋은 날씨예요. 다들 오늘 뭐 하시나요?",
  },
  {
    title: "중고거래 할 때 팁 공유합니다.",
    content: "직거래를 할 때는 밝고 사람이 많은 곳에서 만나는 게 좋아요.",
  },
  {
    title: "판다마켓 사용 후기",
    content: "사고 싶었던 물건을 저렴하게 구해서 기분이 너무 좋네요!",
  },
];

const seedDatabase = async () => {
  try {
    console.log("🧹 기존 데이터를 삭제 중입니다...");
    await prisma.productLike.deleteMany({});
    await prisma.articleLike.deleteMany({});
    await prisma.productComment.deleteMany({});
    await prisma.articleComment.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.article.deleteMany({});
    await prisma.user.deleteMany({});

    console.log("🌱 새로운 데이터를 생성 중입니다...");

    const testUser = await prisma.user.create({
      data: {
        email: "test@example.com",
        nickname: "테스트 유저",
        encryptedPassword: "seed-password-placeholder",
      },
    });

    // 상품 데이터 삽입
    await prisma.product.createMany({
      data: testProduct.map((product) => ({
        ...product,
        ownerId: testUser.id,
      })),
    });

    // 게시글 데이터 삽입
    await prisma.article.createMany({
      data: testArticles.map((article) => ({
        ...article,
        ownerId: testUser.id,
      })),
    });

    console.log("✅ 시딩이 완료되었습니다. (상품 3개, 게시글 3개)");

    await prisma.$disconnect();
    process.exit();
  } catch (err) {
    console.error("❌ 시딩 중 오류 발생:", err);
    await prisma.$disconnect();
    process.exit(1);
  }
};

seedDatabase();

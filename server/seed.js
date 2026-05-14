const dotenv = require("dotenv");
const prisma = require("./lib/prisma");

// [환경 설정 불러오기]
dotenv.config();

// [테스트용 데이터 리스트]
const mockData = [
  {
    title: "빈티지 가죽 가방",
    price: 55000,
    description: "관리가 잘 된 빈티지 가방입니다. 가죽 상태 아주 좋아요.",
  },
  {
    title: "기계식 키보드",
    price: 120000,
    description: "청축 키보드입니다. 타건감이 아주 좋습니다.",
  },
  {
    title: "스마트 워치",
    price: 210000,
    description: "최신형 스마트 워치입니다. 박스 포함 풀구성입니다.",
  },
];

const seedDatabase = async () => {
  try {
    // 1. DB 연결
    console.log("⏳ 데이터베이스 연결 중...");

    // 2. 기존 데이터 삭제 (중복 방지)
    await prisma.product.deleteMany({});
    console.log("🧹 기존 데이터를 모두 삭제했습니다.");

    // 3. 새 데이터 삽입
    await prisma.product.createMany({ data: mockData });
    console.log("🌱 테스트용 데이터 3개가 성공적으로 등록되었습니다.");

    // 4. 연결 종료
    await prisma.$disconnect();
    console.log("👋 작업을 마치고 DB 연결을 종료합니다.");
    process.exit();
  } catch (err) {
    console.error("❌ 에러 발생:", err);
    process.exit(1);
  }
};

seedDatabase();

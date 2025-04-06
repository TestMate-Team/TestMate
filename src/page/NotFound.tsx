import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-white">
      <div className="font-bold font-['Noto_Sans_JP'] text-center px-4">
        <div className="text-6xl sm:text-7xl md:text-8xl lg:text-[128px] text-primary-400 leading-none">
          404
        </div>
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-[40px] text-black leading-tight md:leading-none mt-4">
          お探しのページは見つかりません
        </div>
        <Link
          to="/"
          className="inline-block text-base sm:text-lg md:text-xl lg:text-[24px] text-primary-400 mt-6 md:mt-8 hover:underline leading-none"
        >
          ホームに戻る
        </Link>
      </div>
    </div>
  );
}

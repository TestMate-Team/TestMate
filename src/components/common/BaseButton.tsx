import { Link } from "react-router-dom";

/**
 * 汎用ボタンコンポーネント
 * @param {Object} props
 * @param {string} props.to - Linkとして使用する場合のURL
 * @param {string} props.variant - ボタンのバリエーション: "primary", "outline"
 * @param {string} props.size - ボタンのサイズ: "sm", "md", "lg"
 * @param {Function} props.onClick - クリックハンドラ
 * @param {React.ReactNode} props.children - ボタンのコンテンツ
 * @param {string} props.className - 追加のCSSクラス
 * @param {boolean} props.disabled - 無効状態
 * @param {string} props.type - ボタンのtype属性（"button", "submit", "reset"）
 */

interface BaseButtonProps {
  to?: string;
  variant?: "primary" | "outline" | "secondary";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
}
export function BaseButton({
  to,
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
  children,
  className = "",
  type = "button",
  ...rest
}: BaseButtonProps) {
  // ベースとなるスタイルクラス
  const baseClasses =
    "rounded-md whitespace-nowrap transition-colors duration-200 inline-flex justify-center items-center";

  // サイズに基づくクラス
  const sizeClasses = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-6 py-2.5",
  };

  const variantClasses = {
    primary:
      "bg-primary-400 hover:bg-primary-500 text-white disabled:bg-primary-200",
    outline:
      "border border-primary-400 text-primary-400 hover:bg-primary-100 disabled:opacity-50",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100",
  };

  // スタイルを組み合わせる
  const buttonClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  // Linkとして描画
  if (to) {
    return (
      <Link to={to} className={`${buttonClasses} block text-center`} {...rest}>
        {children}
      </Link>
    );
  }

  // 通常のボタンとして描画
  return (
    <button
      type={type}
      className={`${buttonClasses} ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}

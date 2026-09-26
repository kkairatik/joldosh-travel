import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    // Фото туров пока берём с Unsplash; позже добавится хранилище для загрузок из админки.
    // search не указан, чтобы разрешить параметры размера (?w=1600&q=80): шаблон
    // вида new URL("https://images.unsplash.com/**") запрещает любые параметры
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
  },
};

export default withNextIntl(nextConfig);

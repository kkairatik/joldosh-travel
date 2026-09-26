import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    // Фото туров пока берём с Unsplash; позже добавится хранилище для загрузок из админки
    remotePatterns: [new URL("https://images.unsplash.com/**")],
  },
};

export default withNextIntl(nextConfig);

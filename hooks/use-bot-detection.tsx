"use client"

import { useEffect, useState } from "react"

export function useBotDetection() {
  const [isBot, setIsBot] = useState(false)
  const [botName, setBotName] = useState<string | null>(null)

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return

    const detectBot = () => {
      const userAgent = navigator.userAgent.toLowerCase()

      // Common bot signatures to detect
      const botPatterns = [
        { name: "Googlebot", pattern: /googlebot/i },
        { name: "Bingbot", pattern: /bingbot/i },
        { name: "Baiduspider", pattern: /baiduspider/i },
        { name: "YandexBot", pattern: /yandexbot/i },
        { name: "DuckDuckBot", pattern: /duckduckbot/i },
        { name: "Slurp", pattern: /slurp/i },
        { name: "Twitterbot", pattern: /twitterbot/i },
        { name: "Facebookexternalhit", pattern: /facebookexternalhit/i },
        { name: "LinkedInBot", pattern: /linkedinbot/i },
        { name: "Applebot", pattern: /applebot/i },
        { name: "GPTBot", pattern: /gptbot/i },
        { name: "ClaudeBot", pattern: /claudebot/i },
        { name: "Crawler", pattern: /crawler/i },
        { name: "Spider", pattern: /spider/i },
        { name: "Bot", pattern: /bot/i },
        { name: "Headless Chrome", pattern: /headless/i },
        { name: "Puppeteer", pattern: /puppeteer/i },
        { name: "Selenium", pattern: /selenium/i },
        { name: "PhantomJS", pattern: /phantomjs/i },
      ]

      // Check for bot patterns in user agent
      for (const bot of botPatterns) {
        if (bot.pattern.test(userAgent)) {
          setIsBot(true)
          setBotName(bot.name)
          return
        }
      }

      // Additional bot detection methods
      // Check for missing or suspicious navigator properties that bots often lack
      const navigatorCheck = () => {
        // Most bots don't properly implement these properties
        const suspicious =
          !navigator.webdriver === undefined || // Selenium/WebDriver detection
          !navigator.languages ||
          navigator.languages.length === 0 ||
          !navigator.plugins ||
          navigator.plugins.length === 0

        return suspicious
      }

      // Set as bot if navigator check is suspicious
      if (navigatorCheck()) {
        setIsBot(true)
        setBotName("Unknown Bot")
      }
    }

    detectBot()
  }, [])

  return { isBot, botName }
}

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  
  const getStoredTheme = () => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme")
      return storedTheme || "system"
    }
    return "system"
  }

  useEffect(() => {
    setMounted(true)
    

    const storedTheme = getStoredTheme()
    setTheme(storedTheme)
  }, [setTheme])


  const handleThemeChange = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    

    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme)
    }
  }

  if (!mounted) return null // avoid hydration mismatch

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleThemeChange}
      aria-label={theme === "dark" ? "to light mod" : "to dark mod"}
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-yellow-400" />
      ) : (
        <Moon className="h-5 w-5 text-gray-800" />
      )}
    </Button>
  )
}

export default ThemeSwitcher;
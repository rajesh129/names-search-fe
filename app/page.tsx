"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, ChevronLeft, ChevronRight, Sparkles, BookOpen, Globe } from "lucide-react"

// Mock data for search results
const mockResults = [
  {
    id: 1,
    title: "Advanced Machine Learning Techniques",
    subtitle1: "Data Science",
    subtitle2: "Published 2024",
    description:
      "Comprehensive guide to modern machine learning algorithms including deep learning, neural networks, and practical applications in real-world scenarios.",
    color: "from-blue-500 to-cyan-500",
    category: "tech",
  },
  {
    id: 2,
    title: "Sustainable Energy Solutions",
    subtitle1: "Environmental Science",
    subtitle2: "Research Paper",
    description:
      "Analysis of renewable energy technologies and their impact on reducing carbon emissions. Covers solar, wind, and hydroelectric power systems.",
    color: "from-green-500 to-emerald-500",
    category: "environment",
  },
  {
    id: 3,
    title: "Digital Marketing Strategies",
    subtitle1: "Business",
    subtitle2: "Case Study",
    description:
      "Effective digital marketing approaches for modern businesses, including social media marketing, SEO optimization, and content strategy development.",
    color: "from-purple-500 to-pink-500",
    category: "business",
  },
  {
    id: 4,
    title: "Quantum Computing Fundamentals",
    subtitle1: "Computer Science",
    subtitle2: "Academic",
    description:
      "Introduction to quantum computing principles, quantum algorithms, and potential applications in cryptography and complex problem solving.",
    color: "from-indigo-500 to-purple-500",
    category: "tech",
  },
  {
    id: 5,
    title: "Urban Planning and Smart Cities",
    subtitle1: "Architecture",
    subtitle2: "Urban Development",
    description:
      "Modern approaches to urban planning incorporating smart technology, sustainable development, and community-centered design principles.",
    color: "from-orange-500 to-red-500",
    category: "design",
  },
  {
    id: 6,
    title: "Blockchain Technology Applications",
    subtitle1: "Technology",
    subtitle2: "Innovation",
    description:
      "Exploring blockchain applications beyond cryptocurrency, including supply chain management, healthcare records, and decentralized systems.",
    color: "from-yellow-500 to-orange-500",
    category: "tech",
  },
  {
    id: 7,
    title: "Climate Change Mitigation",
    subtitle1: "Environmental Policy",
    subtitle2: "Global Initiative",
    description:
      "Strategies and policies for addressing climate change at local and global levels, including carbon pricing and international cooperation.",
    color: "from-teal-500 to-green-500",
    category: "environment",
  },
  {
    id: 8,
    title: "Artificial Intelligence Ethics",
    subtitle1: "Philosophy",
    subtitle2: "Ethics Committee",
    description:
      "Examination of ethical considerations in AI development, including bias, privacy, accountability, and the societal impact of automated systems.",
    color: "from-rose-500 to-pink-500",
    category: "philosophy",
  },
]

const languages = [
  { value: "en", label: "English", flag: "🇺🇸" },
  { value: "es", label: "Spanish", flag: "🇪🇸" },
  { value: "fr", label: "French", flag: "🇫🇷" },
  { value: "de", label: "German", flag: "🇩🇪" },
  { value: "zh", label: "Chinese", flag: "🇨🇳" },
  { value: "ja", label: "Japanese", flag: "🇯🇵" },
]

export default function SearchMicrosite() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [results, setResults] = useState<typeof mockResults>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [isSearched, setIsSearched] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [animateResults, setAnimateResults] = useState(false)

  const resultsPerPage = 3

  useEffect(() => {
    if (results.length > 0) {
      setAnimateResults(true)
      const timer = setTimeout(() => setAnimateResults(false), 600)
      return () => clearTimeout(timer)
    }
  }, [results])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsLoading(true)
    setAnimateResults(false)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Filter results based on search query
    const filteredResults = mockResults.filter(
      (result) =>
        result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.subtitle1.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    setResults(filteredResults)
    setTotalResults(filteredResults.length)
    setCurrentPage(1)
    setIsSearched(true)
    setIsLoading(false)
  }

  const totalPages = Math.ceil(totalResults / resultsPerPage)
  const startIndex = (currentPage - 1) * resultsPerPage
  const endIndex = startIndex + resultsPerPage
  const currentResults = results.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    setAnimateResults(true)
    // Scroll to top of results
    document.getElementById("results-section")?.scrollIntoView({ behavior: "smooth" })
    setTimeout(() => setAnimateResults(false), 600)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-sky-50 to-emerald-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-cyan-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-yellow-200/20 to-orange-200/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <Sparkles className="h-8 w-8 text-violet-500 animate-spin-slow" />
              <div className="absolute inset-0 h-8 w-8 text-violet-300 animate-ping opacity-20">
                <Sparkles className="h-8 w-8" />
              </div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Research Hub
            </h1>
            <div className="relative">
              <BookOpen className="h-8 w-8 text-emerald-500 animate-bounce" />
            </div>
          </div>
          <p className="text-slate-600 text-lg animate-fade-in-delay">
            Discover knowledge across multiple disciplines with style ✨
          </p>
        </div>

        {/* Search Form */}
        <Card className="mb-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 animate-slide-up">
          <CardContent className="p-8">
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative group">
                  <Input
                    type="text"
                    placeholder="Search for topics, research, or keywords..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-14 text-lg pl-12 border-2 border-violet-200 focus:border-violet-400 transition-all duration-300 bg-gradient-to-r from-white to-violet-50/50"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-violet-400 group-focus-within:text-violet-600 transition-colors duration-300" />
                </div>
                <div className="md:w-52 relative">
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger className="h-14 border-2 border-emerald-200 focus:border-emerald-400 transition-all duration-300 bg-gradient-to-r from-white to-emerald-50/50">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-emerald-500" />
                        <SelectValue placeholder="Select language" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value} className="hover:bg-emerald-50">
                          <div className="flex items-center gap-2">
                            <span>{lang.flag}</span>
                            <span>{lang.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  type="submit"
                  className="h-14 px-8 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  disabled={isLoading || !searchQuery.trim()}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                      <span>Searching...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Search className="h-5 w-5" />
                      <span>Search</span>
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Results Section */}
        {isSearched && (
          <div id="results-section" className="animate-fade-in">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-8 animate-slide-up">
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                  Search Results
                </h2>
                <p className="text-slate-600 mt-2">
                  <span className="inline-flex items-center gap-1">
                    <span className="font-semibold text-violet-600">{totalResults}</span>
                    <span>{totalResults === 1 ? "result" : "results"} found for</span>
                    <span className="font-medium text-purple-600">"{searchQuery}"</span>
                    {selectedLanguage !== "en" && (
                      <>
                        <span>in</span>
                        <span className="font-medium text-emerald-600">
                          {languages.find((l) => l.value === selectedLanguage)?.label}
                        </span>
                      </>
                    )}
                  </span>
                </p>
              </div>
              <Badge
                variant="secondary"
                className="text-sm bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 border-violet-200 animate-pulse"
              >
                Page {currentPage} of {totalPages || 1}
              </Badge>
            </div>

            {/* Results List */}
            {totalResults > 0 ? (
              <div className="space-y-6">
                {currentResults.map((result, index) => (
                  <Card
                    key={result.id}
                    className={`group hover:shadow-xl transition-all duration-500 border-0 bg-white/90 backdrop-blur-sm hover:bg-white/95 transform hover:-translate-y-1 ${
                      animateResults ? "animate-slide-up" : ""
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`h-1 bg-gradient-to-r ${result.color} rounded-t-lg`}></div>
                    <CardHeader className="pb-4">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <CardTitle className="text-xl text-slate-900 group-hover:text-violet-600 cursor-pointer transition-colors duration-300 flex items-center gap-2">
                          <span>{result.title}</span>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Sparkles className="h-4 w-4 text-violet-400" />
                          </div>
                        </CardTitle>
                        <div className="flex flex-wrap gap-2">
                          <Badge
                            variant="outline"
                            className="border-violet-200 text-violet-700 hover:bg-violet-50 transition-colors duration-300"
                          >
                            {result.subtitle1}
                          </Badge>
                          <Badge
                            variant="secondary"
                            className="bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 hover:from-emerald-200 hover:to-teal-200 transition-all duration-300"
                          >
                            {result.subtitle2}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-slate-700 leading-relaxed group-hover:text-slate-800 transition-colors duration-300">
                        {result.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center space-x-3 mt-12 animate-fade-in">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="border-violet-200 text-violet-600 hover:bg-violet-50 hover:border-violet-300 transition-all duration-300 disabled:opacity-50"
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>

                    <div className="flex space-x-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(page)}
                          className={`w-10 h-10 transition-all duration-300 ${
                            currentPage === page
                              ? "bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 shadow-lg"
                              : "border-violet-200 text-violet-600 hover:bg-violet-50 hover:border-violet-300"
                          }`}
                        >
                          {page}
                        </Button>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="border-violet-200 text-violet-600 hover:bg-violet-50 hover:border-violet-300 transition-all duration-300 disabled:opacity-50"
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <Card className="border-0 bg-white/80 backdrop-blur-sm animate-fade-in">
                <CardContent className="text-center py-16">
                  <div className="text-slate-400 mb-6 relative">
                    <Search className="h-16 w-16 mx-auto animate-pulse" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 border-4 border-violet-200 border-t-violet-400 rounded-full animate-spin opacity-30"></div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-900 mb-3">No results found</h3>
                  <p className="text-slate-600 max-w-md mx-auto">
                    Try adjusting your search terms or check the spelling. We're always here to help you discover
                    amazing content! 🔍
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Welcome Message */}
        {!isSearched && (
          <Card className="text-center py-16 border-0 bg-white/80 backdrop-blur-sm shadow-xl animate-fade-in-delay">
            <CardContent>
              <div className="text-slate-400 mb-6 relative">
                <div className="relative inline-block">
                  <Search className="h-20 w-20 mx-auto animate-bounce" />
                  <div className="absolute -top-2 -right-2">
                    <Sparkles className="h-6 w-6 text-violet-400 animate-spin" />
                  </div>
                  <div className="absolute -bottom-2 -left-2">
                    <div className="w-4 h-4 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-semibold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Start Your Discovery Journey
              </h3>
              <p className="text-slate-600 max-w-lg mx-auto leading-relaxed">
                Enter your search terms above to discover relevant research, articles, and resources across various
                disciplines. Let's explore the world of knowledge together! 🚀
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

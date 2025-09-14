"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { 
  ArrowLeft, 
  Clock, 
  ExternalLink, 
  Share2, 
  Bookmark, 
  ThumbsUp,
  MessageCircle,
  Eye,
  Brain,
  Sparkles
} from "lucide-react"
import Link from "next/link"

// Mock article data
const mockArticle = {
  id: "1",
  title: "Advanced React Patterns for Modern Applications",
  excerpt: "Learn about compound components, render props, and custom hooks to build more maintainable React applications.",
  content: `# Advanced React Patterns for Modern Applications

React has evolved significantly since its inception, and with it, the patterns and practices for building scalable applications have matured. In this comprehensive guide, we'll explore advanced React patterns that can help you write more maintainable, reusable, and performant code.

## Compound Components Pattern

The compound components pattern allows you to create components that work together as a cohesive unit while maintaining flexibility in their composition. This pattern is particularly useful for complex UI components like modals, dropdowns, or form fields.

\`\`\`jsx
const Tabs = ({ children, defaultValue }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
};

const TabsList = ({ children }) => (
  <div className="tabs-list">
    {children}
  </div>
);

const TabsTrigger = ({ value, children }) => {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  
  return (
    <button
      className={activeTab === value ? 'active' : ''}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
};
\`\`\`

## Render Props Pattern

Render props is a technique for sharing code between React components using a prop whose value is a function. This pattern provides excellent flexibility and reusability.

\`\`\`jsx
const DataFetcher = ({ render, url }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [url]);

  return render({ data, loading, error });
};

// Usage
<DataFetcher
  url="/api/users"
  render={({ data, loading, error }) => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    return <UserList users={data} />;
  }}
/>
\`\`\`

## Custom Hooks for Logic Reuse

Custom hooks are one of the most powerful features in React for sharing stateful logic between components. They allow you to extract component logic into reusable functions.

\`\`\`jsx
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
\`\`\`

## Higher-Order Components (HOCs)

HOCs are functions that take a component and return a new component with additional functionality. While hooks have largely replaced many use cases for HOCs, they're still valuable for certain scenarios.

\`\`\`jsx
const withLoading = (WrappedComponent) => {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return <div className="loading-spinner">Loading...</div>;
    }
    return <WrappedComponent {...props} />;
  };
};

const withErrorBoundary = (WrappedComponent) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
      return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
      console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
      if (this.state.hasError) {
        return <div>Something went wrong.</div>;
      }

      return <WrappedComponent {...this.props} />;
    }
  };
};
\`\`\`

## Performance Optimization Patterns

### React.memo for Preventing Unnecessary Re-renders

\`\`\`jsx
const ExpensiveComponent = React.memo(({ data, onUpdate }) => {
  // Expensive computation
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      processed: heavyComputation(item)
    }));
  }, [data]);

  return (
    <div>
      {processedData.map(item => (
        <div key={item.id}>{item.processed}</div>
      ))}
    </div>
  );
});
\`\`\`

### useCallback and useMemo for Expensive Calculations

\`\`\`jsx
const ParentComponent = () => {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);

  const expensiveValue = useMemo(() => {
    return items.reduce((sum, item) => sum + item.value, 0);
  }, [items]);

  const handleItemUpdate = useCallback((id, newValue) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, value: newValue } : item
    ));
  }, []);

  return (
    <div>
      <ExpensiveComponent 
        data={items} 
        onUpdate={handleItemUpdate} 
      />
    </div>
  );
};
\`\`\`

## Conclusion

These advanced React patterns provide powerful tools for building maintainable and scalable applications. The key is to understand when and how to apply each pattern appropriately. Start with simpler patterns like custom hooks and gradually incorporate more complex patterns as your application grows.

Remember, the goal is not to use every pattern in every component, but to choose the right pattern for the right situation. With practice and experience, these patterns will become second nature and help you write better React code.`,
  skills: ["React", "JavaScript", "Frontend", "Hooks", "Patterns"],
  source: "React Blog",
  author: "Sarah Johnson",
  readTime: "8 min read",
  publishedAt: "2 days ago",
  views: 1250,
  likes: 89,
  comments: 23,
  sources: [
    {
      title: "React Official Documentation",
      url: "https://react.dev/learn/reusing-logic-with-custom-hooks",
      description: "Official React documentation on custom hooks"
    },
    {
      title: "Advanced React Patterns",
      url: "https://kentcdodds.com/blog/compound-components-with-react-hooks",
      description: "Kent C. Dodds' comprehensive guide to compound components"
    },
    {
      title: "React Performance Optimization",
      url: "https://react.dev/learn/render-and-commit",
      description: "React's official guide to performance optimization"
    }
  ]
}

export default function ArticleDetailPage({ params }: { params: { id: string } }) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [showSources, setShowSources] = useState(false)

  return (
    <div className="min-h-screen gradient-mesh">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="border-b border-border/50 bg-background/80 backdrop-blur-xl"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Articles
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={isBookmarked ? "text-primary" : ""}
              >
                <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <Card className="glass p-8">
              <div className="flex items-center space-x-2 mb-4">
                {mockArticle.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {mockArticle.title}
              </h1>
              
              <p className="text-xl text-muted-foreground mb-6">
                {mockArticle.excerpt}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {mockArticle.readTime}
                  </span>
                  <span className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    {mockArticle.views.toLocaleString()} views
                  </span>
                  <span>By {mockArticle.author}</span>
                  <span>{mockArticle.publishedAt}</span>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsLiked(!isLiked)}
                    className={isLiked ? "text-primary" : ""}
                  >
                    <ThumbsUp className={`h-4 w-4 mr-1 ${isLiked ? "fill-current" : ""}`} />
                    {mockArticle.likes}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    {mockArticle.comments}
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* AI Excerpt */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <Card className="glass p-6 border-primary/20">
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Brain className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary">AI Summary</h3>
                  <p className="text-sm text-muted-foreground">Key insights from this article</p>
                </div>
              </div>
              <div className="prose prose-sm max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  This comprehensive guide covers essential React patterns including compound components for flexible UI composition, 
                  render props for logic sharing, custom hooks for stateful logic reuse, and performance optimization techniques. 
                  The article provides practical code examples and best practices for building maintainable, scalable React applications. 
                  Key takeaways include using React.memo for preventing unnecessary re-renders, leveraging useCallback and useMemo for 
                  expensive calculations, and implementing proper error boundaries for robust error handling.
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-8"
          >
            <Card className="glass p-8">
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <div dangerouslySetInnerHTML={{ __html: mockArticle.content.replace(/\n/g, '<br/>') }} />
              </div>
            </Card>
          </motion.div>

          {/* Sources Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-8"
          >
            <Card className="glass p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-lg bg-success/10 flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-success" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Sources & References</h3>
                    <p className="text-muted-foreground">Explore the original sources and related content</p>
                  </div>
                </div>
                
                <Dialog open={showSources} onOpenChange={setShowSources}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View All Sources
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Article Sources</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      {mockArticle.sources.map((source, index) => (
                        <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                          <h4 className="font-semibold mb-2">{source.title}</h4>
                          <p className="text-sm text-muted-foreground mb-3">{source.description}</p>
                          <Button variant="outline" size="sm" asChild>
                            <a href={source.url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Visit Source
                            </a>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="grid gap-4">
                {mockArticle.sources.slice(0, 2).map((source, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{source.title}</h4>
                      <p className="text-sm text-muted-foreground">{source.description}</p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href={source.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Visit
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

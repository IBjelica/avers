import * as React from "react"
import useEmblaCarousel, { type EmblaPluginType } from "embla-carousel-react"
import Autoplay from 'embla-carousel-autoplay'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type CarouselApi = ReturnType<typeof useEmblaCarousel>[1]
type CarouselOptions = NonNullable<Parameters<typeof useEmblaCarousel>[0]>

interface CarouselProps {
  opts?: CarouselOptions
  plugins?: EmblaPluginType[]
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

interface CarouselContextProps extends CarouselProps {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: CarouselApi
  scrollPrev: () => void
  scrollNext: () => void
  scrollTo: (index: number) => void
  canScrollPrev: boolean
  canScrollNext: boolean
}

interface CarouselDotButtonProps {
  index: number
}

const CarouselDotButton: React.FC<CarouselDotButtonProps> = ({ index }) => {
  const { api } = useCarousel();
  const [selected, setSelected] = React.useState(false);

  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      const currentIndex = api.selectedScrollSnap();
      setSelected(currentIndex === index);
    };

    api.on('select', onSelect);
    onSelect();

    return () => {
      api.off('select', onSelect);
    };
  }, [api, index]);

  const onClick = React.useCallback(() => {
    if (!api) return;
    api.scrollTo(index);
  }, [api, index]);

  return (
    <button
      className={cn(
        'w-3 h-3 rounded-full transition-all duration-300',
        selected ? 'bg-white' : 'bg-gray-300 hover:bg-gray-400'
      )}
      onClick={onClick}
      aria-label={`Go to slide ${index + 1}`}
    />
  );
};

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      plugins,
      setApi,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    )
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) return

      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }, [])

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev()
    }, [api])

    const scrollNext = React.useCallback(() => {
      api?.scrollNext()
    }, [api])

    const scrollTo = React.useCallback((index: number) => {
      api?.scrollTo(index)
    }, [api])

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext]
    )

    React.useEffect(() => {
      if (!api || !setApi) {
        return
      }

      setApi(api)
    }, [api, setApi])

    React.useEffect(() => {
      if (!api) {
        return
      }

      onSelect(api)
      api.on("select", onSelect)
      api.on("reInit", onSelect)

      return () => {
        api?.off("select", onSelect)
        api?.off("reInit", onSelect)
      }
    }, [api, onSelect])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          scrollTo,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex cursor-grab active:cursor-grabbing",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation, api } = useCarousel()
  const [isCurrent, setIsCurrent] = React.useState(false)

  React.useEffect(() => {
    if (!api) return undefined

    const updateOpacity = () => {
      const slideNodes = api.slideNodes()
      const currentIndex = api.selectedScrollSnap()
      
      // Handle cases with single child or array of children
      const childrenArray = React.Children.toArray(props.children)
      const index = childrenArray.findIndex((child) => {
        // Check if the child is a valid React element
        if (React.isValidElement(child)) {
          // Use optional chaining and nullish coalescing to safely access ref
          const childRef = (child as React.ReactElement & { ref?: React.Ref<HTMLElement> }).ref
          const refCurrent = childRef && 'current' in childRef ? childRef.current : null
          
          // Only compare if refCurrent is not null
          return refCurrent ? slideNodes.indexOf(refCurrent) !== -1 : false
        }
        return false
      })

      setIsCurrent(currentIndex === index)
    }

    updateOpacity()
    api.on("select", updateOpacity)
    
    return () => {
      api.off("select", updateOpacity)
    }
  }, [api, props.children])

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className,
        isCurrent ? "opacity-100 scale-100" : "scale-95"
      )}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "ghost", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "h-10 w-10 rounded-full flex items-center justify-center bg-transparent hover:bg-transparent",
        orientation === "horizontal"
          ? "-left-12 top-1/2"
          : "-top-12 left-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <svg 
        width="40" 
        height="40" 
        viewBox="0 0 40 40" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="transition-colors group"
      >
        <path 
          d="M25 10L15 20L25 30" 
          stroke="#0E1A28" 
          strokeWidth="5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="transition-colors group-hover:stroke-white"
        />
      </svg>
      <span className="sr-only">Previous slide</span>
    </Button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "ghost", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "h-10 w-10 rounded-full flex items-center justify-center bg-transparent hover:bg-transparent",
        orientation === "horizontal"
          ? "-right-12 top-1/2"
          : "-bottom-12 left-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <svg 
        width="40" 
        height="40" 
        viewBox="0 0 40 40" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="rotate-180 transition-colors group"
      >
        <path 
          d="M25 10L15 20L25 30" 
          stroke="#0E1A28" 
          strokeWidth="5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="transition-colors group-hover:stroke-white"
        />
      </svg>
      <span className="sr-only">Next slide</span>
    </Button>
  )
})
CarouselNext.displayName = "CarouselNext"

const CarouselDots = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { api } = useCarousel()
  const [, setSelectedIndex] = React.useState(0)
  const [slideCount, setSlideCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) return

    setSlideCount(api.scrollSnapList().length)
    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap())
    }

    api.on("select", onSelect)
    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  if (slideCount === 0) return null

  return (
    <div
      ref={ref}
      className={cn("flex items-center justify-center gap-2 mt-8", className)}
      {...props}
    >
      {Array.from({ length: slideCount }).map((_, index) => (
        <CarouselDotButton key={index} index={index} />
      ))}
    </div>
  )
})
CarouselDots.displayName = "CarouselDots"

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
  Autoplay,
}

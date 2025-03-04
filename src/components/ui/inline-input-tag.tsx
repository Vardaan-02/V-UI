"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface Tag {
  id: string
  text: string
}

interface InlineTagInputProps {
  className?: string
  inputClassName?: string
  tagClassName?: string
  removeTagButtonClassName?: string
  tags: Array<Tag>
  setTags: React.Dispatch<React.SetStateAction<Array<Tag>>>
}

export function InlineTagInput({
  className,
  inputClassName,
  tagClassName,
  removeTagButtonClassName,
  tags,
  setTags,
}: InlineTagInputProps) {
  const [inputValue, setInputValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addTag()
    } else if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
      removeTag(tags[tags.length - 1].id)
    }
  }

  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const addTag = () => {
    const trimmedInput = inputValue.trim()
    if (trimmedInput && !tags.some((tag) => tag.text.toLowerCase() === trimmedInput.toLowerCase())) {
      setTags([...tags, { id: Date.now().toString(), text: trimmedInput }])
      setInputValue("")
    }
  }

  const removeTag = (idToRemove: string) => {
    setTags(tags.filter((tag) => tag.id !== idToRemove))
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex flex-wrap items-center p-2 border rounded-md w-96",
        className,
      )}
      onClick={handleContainerClick}
    >
      <AnimatePresence>
        {tags.map((tag) => (
          <motion.span
            key={tag.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "inline-flex items-center px-2 py-1 m-1 rounded-full text-xs font-medium bg-primary text-primary-foreground",
              tagClassName,
            )}
          >
            {tag.text}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeTag(tag.id)}
              className={cn("ml-1 h-4 w-4 p-0 hover:bg-primary/60 hover:text-white", removeTagButtonClassName)}
              aria-label={`Remove ${tag.text} tag`}
            >
              <X className="h-3 w-3" />
            </Button>
          </motion.span>
        ))}
      </AnimatePresence>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder={tags.length === 0 ? "Add tags..." : ""}
        aria-label="Add a tag"
        className={cn(
          "border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0 text-sm flex-1 min-w-[120px] border-0 outline-none",
          inputClassName,
        )}
      />
    </div>
  )
}


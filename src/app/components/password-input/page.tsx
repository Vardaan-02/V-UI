import AppPreview from "@/components/app-preview";
import AppHeading from "@/components/app-heading";
import Timeline from "@/components/ui/timeline";
import CodeSnippet from "@/components/ui/code-snippet";
import AppProps from "@/components/app-props";
import AppFooter from "@/components/app-footer";
import Code from "./code";
import Preview from "./preview";

export default function Page() {
  return (
    <div className="h-full py-8 xl:px-48 lg:px-16 px-4 space-y-8 overflow-x-hidden">
      <AppHeading heading={heading} description={description} />
      <AppPreview Code={<Code />} Preview={<Preview />} />
      <Timeline steps={steps} />
      <AppProps props={props} />
      <AppFooter />
    </div>
  );
}

const heading = "Password Input";
const description = `The PasswordInput component is a password field with a strength indicator, providing real-time feedback on password strength based on specific criteria. It features visibility toggle, progress bar, and requirement check icons for enhanced usability and accessibility.`;

const steps = [
  {
    key: 1,
    title: "Install Dependencies",
    height: "5rem",
    content: (
      <CodeSnippet
        theme="dark"
        code={"npm i motion clsx tailwind-merge"}
        className="w-[16rem] md:max-w-[812px] xl:w-[980px]"
      />
    ),
  },
  {
    key: 2,
    title: "Install Dependencies For Animations",
    height: "6rem",
    content: (
      <CodeSnippet
        theme="dark"
        className="w-[16rem] md:max-w-[812px] xl:w-[980px]"
        code={`npm install framer-motion
npx shadcn@latest add label`}
      />
    ),
  },
  {
    key: 3,
    title: "Add Util File",
    height: "15rem",
    content: (
      <>
        <p className="mb-2 ml-4 font-light text-md">lib/utils.ts</p>
        <CodeSnippet
          className="w-[16rem] md:max-w-[812px] xl:w-[980px]"
          theme="dark"
          code={`import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`}
        />
      </>
    ),
  },
  {
    key: 4,
    height: "28rem",
    title: "Copy The Source Code",
    content: (
      <>
        <p className="mb-2 ml-4 font-light text-md">
          components/ui/password-input.tsx
        </p>
        <CodeSnippet
          showLineNumbers={true}
          className="h-96 w-[16rem] md:max-w-[812px] xl:w-[980px]"
          theme="dark"
          code={`
"use client";

import React, { useMemo, useState } from "react";
import { Check, Eye, EyeOff, X } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface PasswordInputProps {
  className?: string;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

export const PasswordInput = React.forwardRef<
  HTMLDivElement,
  PasswordInputProps
>(({ className, password, setPassword }, ref) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const checkStrength = (pass: string) => {
    const requirements = [
      { regex: /.{8,}/, text: "At least 8 characters" },
      { regex: /[0-9]/, text: "At least 1 number" },
      { regex: /[a-z]/, text: "At least 1 lowercase letter" },
      { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
      { regex: /[!@#$%^&*(),.?":{}|<>]/, text: "At least 1 special character" },
    ];

    return requirements.map((req) => ({
      met: req.regex.test(pass),
      text: req.text,
    }));
  };

  const strength = checkStrength(password);

  const strengthScore = useMemo(() => {
    return strength.filter((req) => req.met).length;
  }, [strength]);

  const getStrengthColor = (score: number) => {
    if (score === 0) return "bg-border";
    if (score <= 2) return "bg-red-500";
    if (score <= 3) return "bg-orange-500";
    if (score === 4) return "bg-amber-500";
    return "bg-emerald-500";
  };

  const getStrengthText = (score: number) => {
    if (score === 0) return "Enter a password";
    if (score <= 2) return "Weak password";
    if (score <= 3) return "Medium password";
    if (score === 4) return "Strong password";
    return "Very strong password";
  };

  return (
    <div className={className} ref={ref}>
      <div className="space-y-2">
        <Label htmlFor="input-51">Input with password strength indicator</Label>
        <div className="relative">
          <Input
            id="input-51"
            className="pe-9"
            placeholder="Password"
            type={isVisible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={strengthScore < 5}
            aria-describedby="password-strength"
          />
          <button
            className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            type="button"
            onClick={toggleVisibility}
            aria-label={isVisible ? "Hide password" : "Show password"}
            aria-pressed={isVisible}
            aria-controls="password"
          >
            {isVisible ? (
              <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
            ) : (
              <Eye size={16} strokeWidth={2} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <div
        className="mb-4 mt-3 h-1 w-full overflow-hidden rounded-full bg-border"
        role="progressbar"
        aria-valuenow={strengthScore}
        aria-valuemin={0}
        aria-valuemax={5}
        aria-label="Password strength"
      >
        <div
          className={\`h-full \${getStrengthColor(
            strengthScore
          )} transition-all duration-500 ease-out\`}
          style={{ width: \`\${(strengthScore / 5) * 100}%\` }}
        ></div>
      </div>

      <p
        id="password-strength"
        className="mb-2 text-sm font-medium text-foreground"
      >
        {getStrengthText(strengthScore)}. Must contain:
      </p>

      <ul className="space-y-1.5" aria-label="Password requirements">
        {strength.map((req, index) => (
          <li key={index} className="flex items-center gap-2">
            {req.met ? (
              <Check
                size={16}
                className="text-emerald-500"
                aria-hidden="true"
              />
            ) : (
              <X
                size={16}
                className="text-muted-foreground/80"
                aria-hidden="true"
              />
            )}
            <span
              className={\`text-xs \${
                req.met ? "text-emerald-600" : "text-muted-foreground"
              }\`}
            >
              {req.text}
              <span className="sr-only">
                {req.met ? " - Requirement met" : " - Requirement not met"}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";
`}
        />
      </>
    ),
  },
  {
    key: 5,
    title: "Ready To Use",
    height: "5rem",
    content: <></>,
  },
];

const props = [
  {
    name: "password",
    type: "string",
    required: true,
    default: "",
    description: "Password Entered By User.",
  },
  {
    name: "setPassword",
    type: "setStateAction<string>",
    required: true,
    default: "",
    description: "State Action to set Password.",
  },
];

"use client";

import { Button } from "@/components/ui/button";
import Header from "@/components/ui/Header";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SheetSide } from "@/components/ui/SheetSlide";

import Image from "next/image";

export default function Home() {
  const handleClick = () => {
    console.log("Button clicked!");
  };
  const SHEET_SIDES = ["top", "right", "bottom", "left"] as const;

  type SheetSide = (typeof SHEET_SIDES)[number];
  return <>
  
  </>;
}

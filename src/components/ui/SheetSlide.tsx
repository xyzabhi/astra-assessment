"use client";

import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const SHEET_SIDES = ["top", "right", "bottom", "left"] as const;

type SheetSide = (typeof SHEET_SIDES)[number];

export function SheetSide() {
  return (
    <div className="grid grid-cols-2 gap-2">
      {SHEET_SIDES.map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button variant="outline">{side}</Button>
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <h1>Abhinav</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Praesentium omnis numquam vero voluptatum sint ea sunt impedit
                  eveniet aspernatur, animi enim ullam tenetur illo laboriosam,
                  vel est quod esse? Illo.Lorem Lorem ipsum dolor sit amet,
                  consectetur adipisicing elit. Sapiente nisi quae, sint,
                  mollitia deleniti saepe nemo, fugiat alias adipisci autem unde
                  dolore debitis recusandae esse! Enim iste maiores praesentium
                  fugiat!
                </p>
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
}

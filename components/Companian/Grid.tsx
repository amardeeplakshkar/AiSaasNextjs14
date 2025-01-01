"use client";

import { Card } from "@/components/ui/card";
import { companions } from "@/lib/companions";
import Link from "next/link";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

export const CompanionGrid = () => {
  const [companionName, setCompanionName] = useState('');
  const [description, setDescription] = useState('');
  const [companionNameError, setCompanionNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  // Real-time validation for companion name
  const validateCompanionName = (name: string) => {
    if (!name) {
      setCompanionNameError('Companion name is required.');
    } else {
      setCompanionNameError('');
    }
  };

  // Real-time validation for description
  const validateDescription = (desc: string) => {
    if (!desc) {
      setDescriptionError('Description is required.');
    } else {
      setDescriptionError('');
    }
  };

  const [result, setResult] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target as HTMLFormElement);

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setResult("Access key is missing. Please check your configuration.");
      return;
    }

    formData.append("access_key", accessKey);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      (event.target  as HTMLFormElement).reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {companions.map((companion) => (
        <Card
          key={companion.id}
          className="bg-primary-foreground/10 rounded-xl overflow-hidden transition hover:scale-105 hover:shadow-xl"
        >
          <Link href={`/companions/${companion.id}`}>
            <div className="aspect-square relative">
              <Image
                src={companion.image}
                alt={companion.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg">{companion.name}</h3>
              <p className="text-sm line-clamp-1 text-muted-foreground">{companion.description}</p>
            </div>
          </Link>
        </Card>
      ))}
      <Dialog>
        <DialogTrigger>
          <Card
            className="bg-primary-foreground/10 rounded-xl overflow-hidden transition hover:scale-105 hover:shadow-xl"
          >
            <div>
              <div className="aspect-square relative">
                <Image
                  src="https://res.cloudinary.com/duscymcfc/image/upload/f_auto,q_auto/v1/aisaas/suggest"
                  alt="Suggest Companion"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 text-start">
                <h3 className="font-semibold text-lg">Suggest</h3>
                <p className="text-sm line-clamp-1 capitalize text-muted-foreground">
                  Suggest next companion
                </p>
              </div>
            </div>
          </Card>
        </DialogTrigger>
        <DialogContent className="rounded-md w-[95dvw]">
          <DialogTitle className="text-center font-bold text-lg">
            Suggest New Companion
          </DialogTitle>
          <form onSubmit={onSubmit} className="space-y-2">
            <div>
              <Label>Companion Name:</Label>
              <Input
              name="name"
              type="text"
              required
                value={companionName}
                onChange={(e) => {
                  setCompanionName(e.target.value);
                  validateCompanionName(e.target.value); 
                }}
                placeholder="Enter companion name"
              />
              {companionNameError && <p className="text-red-500 text-sm">{companionNameError}</p>}
            </div>
            <div>
              <Label>Description:</Label>
              <Textarea
              name="message"
              required
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  validateDescription(e.target.value); // Real-time validation
                }}
                placeholder="Enter description"
                rows={2}
              />
              {descriptionError && <p className="text-red-500 text-sm">{descriptionError}</p>}
            </div>
              <Button type="submit" variant="default" disabled={!!companionNameError || !!descriptionError}>
                Submit
              </Button>
              <br />
              <span className="text-red-500 text-sm">{result}</span>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

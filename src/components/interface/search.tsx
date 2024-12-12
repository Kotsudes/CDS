"use client"
import React, { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { CalendarIcon} from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { MultiSelect, TypographyH4 } from "@/components/ui"
import * as ArrondissementService from "@/services/arrondissement";
import * as QuartierService from "@/services/quartier";
import * as CategoryService from "@/services/categories";


const formSchema = z.object({
    dateDebut: z.date(),
    dateFin: z.date(),
    pointDepart: z.tuple([z.coerce.number(), z.coerce.number()]),
    pointFin: z.tuple([z.coerce.number(), z.coerce.number()]),
    categories: z.array(z.string()),
    zones: z.array(z.string()),
})

const frameworksList = [
    { value: "", label: "" },
];

export function Search() {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [zones, setZones] = useState<{label: string;value: string;icon?: React.ComponentType<{className?: string;}>}[]>(frameworksList)
    const [categories, setCategories] = useState<{label: string;value: string;icon?: React.ComponentType<{className?: string;}>}[]>(frameworksList)

    useEffect(() => {

        const fetchData = async () => {
            const arrondissementsNames = (await ArrondissementService.getNames()).map((name) => {
                return {value: name, label: name}
            });
            const quartiersNames = (await QuartierService.getNames()).map((name) => {
                return {value: name, label: name}
            });

            setZones(() => [...quartiersNames, ...arrondissementsNames])

            const categoriesNames = (await CategoryService.get()).map((name) => {
                return {value: name, label: name}
            }); 

            //setCategories(() => [...categoriesNames])
        }

        fetchData()
    }, [])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            zones: [],
            categories: [],
            dateDebut: new Date(),
            dateFin: new Date(),
            pointDepart: [0, 0],
            pointFin: [0, 0],
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-4">
                <div className="flex flex-col">
                    <TypographyH4>Date</TypographyH4>
                    <FormField
                        control={form.control}
                        name="dateDebut"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Date de début</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP", { locale: fr })
                                                ) : (
                                                    <span>Choisissez une date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0 z-50" align="start" >
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() || date < new Date("2002-06-29") || date > form.getValues("dateFin")
                                            }
                                            locale={fr}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>La date après laquelle les évènements sont comptabilisés</FormDescription>
                                <FormMessage />
                            </FormItem> 
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dateFin"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Date de fin</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP", { locale: fr })
                                                ) : (
                                                    <span>Choisissez une date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0 z-50" align="start" >
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() || date < form.getValues("dateDebut")
                                            }
                                            locale={fr}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>La date avant laquelle les évènements sont comptabilisés</FormDescription>
                                <FormMessage />
                            </FormItem> 
                        )}
                    />
                        
                </div>
                <div className="flex flex-col">
                    <TypographyH4>Ville</TypographyH4>
                    <FormField
                        control={form.control}
                        name="zones"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Zones de rercherche</FormLabel>

                                <FormControl>
                                    <MultiSelect
                                        options={zones}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        placeholder="Selectionnez des zones"
                                        animation={2}
                                        maxCount={3}
                                    />
                                </FormControl>
                                <FormDescription>Sélectionnez les zones où les évènements seront cherchés</FormDescription>
                                <FormMessage />
                            </FormItem>
                                                        
                        )}/>

                    <FormField
                        control={form.control}
                        name="categories"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Catégories</FormLabel>

                                <FormControl>
                                    <MultiSelect
                                        options={categories}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        placeholder="Selectionnez des catégories"
                                        animation={2}
                                        maxCount={3}
                                    />
                                </FormControl>
                                <FormDescription>Sélectionnez les catégories des évènements à chercher</FormDescription>
                                <FormMessage />
                            </FormItem>
                                                        
                        )}/>
                    
                </div>
                <div className="flex flex-col">
                    <TypographyH4>Points</TypographyH4>
                    <div className="flex">
                        <FormField
                            control={form.control}
                            name="pointDepart.0"
                            render={({ field }) => (
                                <>
                                    <FormItem>
                                        <FormLabel>Longitude A</FormLabel>

                                        <FormControl>
                                            <Input type="number" value={field.value} onChange={field.onChange}/>
                                        </FormControl>
                                        <FormDescription>Entrez la longitude du premier point A</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                </>                       
                            )}/>
                        <FormField
                            control={form.control}
                            name="pointDepart.1"
                            render={({ field }) => (
                                <>
                                    <FormItem>
                                        <FormLabel>Latitude A</FormLabel>

                                        <FormControl>
                                            <Input type="number" value={field.value} onChange={field.onChange}/>
                                        </FormControl>
                                        <FormDescription>Entrez la latidude du premier point A</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                </>                       
                            )}/>
                    </div>
                    <div className="flex">
                        <FormField
                            control={form.control}
                            name="pointFin.0"
                            render={({ field }) => (
                                <>
                                    <FormItem>
                                        <FormLabel>Longitude B</FormLabel>

                                        <FormControl>
                                            <Input type="number" value={field.value} onChange={field.onChange}/>
                                        </FormControl>
                                        <FormDescription>Entrez la longitude du premier point B</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                </>                       
                            )}/>
                        <FormField
                            control={form.control}
                            name="pointFin.1"
                            render={({ field }) => (
                                <>
                                    <FormItem>
                                        <FormLabel>Latitude B </FormLabel>

                                        <FormControl>
                                            <Input type="number" value={field.value} onChange={field.onChange}/>
                                        </FormControl>
                                        <FormDescription>Entrez la latidude du premier point B</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                </>                       
                            )}/>
                    </div>
                    
                </div>
                <div className="flex flex-col">
                    <TypographyH4>Submit</TypographyH4>
                    <Button type="submit">Filtrer</Button>
                </div>
            </form>            
        </Form>

    )
}

"use client";
import * as z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CheckIcon, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "@radix-ui/react-icons"
import { Calendar } from "@/components/ui/calendar"
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
// import FileUpload from "@/components/FileUpload";
import { useToast } from "../ui/use-toast";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Textarea } from "../ui/textarea";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";

const heures = ['01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00', '00:00']
const jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']


const offres = [
  { label: "Buy 1 Get 1", value: "1" },
  { label: "Remise %", value: "2" },
  { label: "Freebies", value: "3" },
  { label: "Combo Meal", value: "4" },
  { label: "Happy hours specials", value: "5" },
  { label: "Limited/Flash-Time Offres", value: "6" },
  { label: "Family ou group discounts", value: "7" },
] as const

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Product Name must be at least 3 characters" }),
  description: z
    .string()
    .min(3, { message: "Product description must be at least 3 characters" }),
  price: z.coerce.number(),
  category: z.string().min(1, { message: "Please select a category" }),
  offre: z.string({
    required_error: "Please select a language.",
  }),
  titre: z.string(),
  remise: z.number(),
  remiseType: z.enum(["Oui", "Non", "none"], {
    required_error: "You need to select a notification type.",
  }),
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  combo: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  min: z.enum(["Oui", "Non", "none"], {
    required_error: "You need to select a montant type.",
  }),
  qty: z.number(),
  qtyAsk: z.enum(["Oui", "Non", "none"], {
    required_error: "You need to select a montant type.",
  }),
  unique: z.number(),
  uniqueAsk: z.enum(["Oui", "Non"], {
    required_error: "You need to select a montant type.",
  }),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData: any | null;
  categories: any;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  categories,
}) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
  })
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [hinp, setHinp] = useState({
    jour: "",
    start: "",
    end: ""
  })
  const [happyHours, setHappyHours] = useState([
    {
      jour: 'Lundi',
      heures: {
        start: null,
        end: null
      }
    },
    {
      jour: 'Mardi',
      heures: {
        start: null,
        end: null
      }
    },
    {
      jour: 'Merecredi',
      heures: {
        start: null,
        end: null
      }
    },
    {
      jour: 'Jeudi',
      heures: {
        start: null,
        end: null
      }
    },
    {
      jour: 'Vendredi',
      heures: {
        start: null,
        end: null
      }
    },
    {
      jour: 'Samedi',
      heures: {
        start: null,
        end: null
      }
    },
    {
      jour: 'Dimanche',
      heures: {
        start: null,
        end: null
      }
    },
  ])


  const title = initialData ? "Edit product" : "Nouveau Offre";
  const description = initialData ? "Edit a product." : "Les informations de l'offre";
  const toastMessage = initialData ? "Product updated." : "Product created.";
  const action = initialData ? "Save changes" : "Create";

  const defaultValues = initialData
    ? initialData
    : {
        name: "",
        description: "",
        price: 0,
        category: "",
        offre: "1",
        items: [],
        combo: []
      };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        // await axios.post(`/api/products/edit-product/${initialData._id}`, data);
      } else {
        // const res = await axios.post(`/api/products/create-product`, data);
        // console.log("product", res);
      }
      router.refresh();
      router.push(`/dashboard/products`);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      //   await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
      router.refresh();
      router.push(`/${params.storeId}/products`);
    } catch (error: any) {
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  
  return (
    <Dialog>
      {/* <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      /> */}
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
           <FormField
          control={form.control}
          name="offre"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel>Choix de type d'offre : *</FormLabel>
              <Popover>
                <PopoverTrigger asChild className="w-full">
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? offres.find(
                            (language) => language.value === field.value
                          )?.label
                        : "Select language"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command className="w-full" >
                    <CommandInput placeholder="Search language..." />
                    <CommandEmpty>No language found.</CommandEmpty>
                    <CommandGroup>
                      {offres.map((language) => (
                        <CommandItem
                          value={language.label}
                          key={language.value}
                          onSelect={() => {
                            form.setValue("offre", language.value)
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4",
                              language.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {language.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              
              <FormMessage />
            </FormItem>
          )}
        />
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre de l'offre : *</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Titre de l'offre :"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Description de l'offre : *</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder="Description de l'offre : *"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {
              form.watch('offre') === "1"
              &&
              <FormField
          control={form.control}
          name="offre"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Buy 1 Options: *</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        " justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? offres.find(
                            (language) => language.value === field.value
                          )?.label
                        : "Select language"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput placeholder="Search language..." />
                    <CommandEmpty>No language found.</CommandEmpty>
                    <CommandGroup>
                      {offres.map((language) => (
                        <CommandItem
                          value={language.label}
                          key={language.value}
                          onSelect={() => {
                            form.setValue("offre", language.value)
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4",
                              language.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {language.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
            }
            {
              form.watch('offre') === "1"
              &&
              <FormField
          control={form.control}
          name="offre"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Get 1 Options: *</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        " justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? offres.find(
                            (language) => language.value === field.value
                          )?.label
                        : "Select language"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput placeholder="Recherche..." />
                    <CommandEmpty>No language found.</CommandEmpty>
                    <CommandGroup heading="cc">
                      {offres.map((language) => (
                        <CommandItem
                          value={language.label}
                          key={language.value}
                          onSelect={() => {
                            form.setValue("offre", language.value)
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4",
                              language.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {language.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
            }
           
          </div>
          {
            form.watch('offre') === "2"
            &&
            <div className="grid md:grid-cols-3 gap-8" >
              <FormField
              control={form.control}
              name="remise"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Montant de la remise (en %): *</FormLabel>
                  <FormControl>
                    <Input
                    type="number"
                      disabled={loading}
                      placeholder="Montant de la remise (en %):"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="col-span-2" ></div>
            <FormField
          control={form.control}
          name="remiseType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Souhaitez-vous appliquer la remise sur :</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Oui" />
                    </FormControl>
                    <FormLabel className="font-normal">
                    Sur toute la carte
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Non" />
                    </FormControl>
                    <FormLabel className="font-normal">
                    Sur certain produits
                    </FormLabel>
                  </FormItem>
                 
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {
          form.watch('remiseType') === "Non"
          &&
          <FormField
          control={form.control}
          name="offre"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        " justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? offres.find(
                            (language) => language.value === field.value
                          )?.label
                        : "Sélectionnez les produits sur lesquels vous souhaitez appliquer la remise"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput placeholder="Recherche..." />
                    <CommandEmpty>No language found.</CommandEmpty>
                    <CommandGroup heading="cc">
                      {offres.map((language) => (
                        <CommandItem
                          value={language.label}
                          key={language.value}
                          onSelect={() => {
                            form.setValue("offre", language.value)
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4",
                              language.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {language.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        }
            </div>
           }
           {
            form.watch('offre') === "3"
            &&
            <div>
              <FormField
          control={form.control}
          name="items"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel>Sélectionnez le produits que vous souhaitez offrir gratuitement : *</FormLabel>
              <Popover>
                <PopoverTrigger asChild className="w-full">
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {"Select Items"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command className="w-full" >
                    <CommandInput placeholder="Search language..." />
                    <CommandEmpty>No language found.</CommandEmpty>
                    <CommandGroup>
                      {offres.map((language) => (
                        <CommandItem
                          value={language.label}
                          key={language.value}
                          onSelect={() => {
                            let vals = form.watch('items')
                            if(vals.includes(language.label)) {
                              form.setValue('items', vals.filter(f => f !== language.label))
                            }
                            else {
                              form.setValue("items", [...vals, language.label])
                            }
                            
                          }}
                        >
                          
                          <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        field.value.includes(language.label)
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className={cn("h-4 w-4")} />
                    </div>
                          {language.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              
              <FormMessage />
            </FormItem>
          )}
        />
        {
          form.watch('items')?.map((e, i) => (
            <Badge
                        variant="secondary"
                        key={i}
                        className="rounded-sm px-1 font-normal"
                      >
                        {e}
            </Badge>
          ))
        }
            </div>
           }
           {
            form.watch('offre') === "4"
            &&
            <div className="grid md:grid-cols-2 gap-8" >
              <div>
              <FormField
          control={form.control}
          name="combo"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel>Les elements de votre combo</FormLabel>
              <Popover>
                <PopoverTrigger asChild className="w-full">
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {"Select Items"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command className="w-full" >
                    <CommandInput placeholder="Search language..." />
                    <CommandEmpty>No language found.</CommandEmpty>
                    <CommandGroup>
                      {offres.map((language) => (
                        <CommandItem
                          value={language.label}
                          key={language.value}
                          onSelect={() => {
                            let vals = form.watch('combo')
                            if(vals.includes(language.label)) {
                              form.setValue('combo', vals.filter(f => f !== language.label))
                            }
                            else {
                              form.setValue("combo", [...vals, language.label])
                            }
                            
                          }}
                        >
                          
                          <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        field.value.includes(language.label)
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className={cn("h-4 w-4")} />
                    </div>
                          {language.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              
              <FormMessage />
            </FormItem>
          )}
          />
           {
          form.watch('combo')?.map((e, i) => (
            <Badge
                        variant="secondary"
                        key={i}
                        className="rounded-sm px-1 font-normal"
                      >
                        {e}
            </Badge>
          ))
        }
              </div>
              <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prix du combo meal : *</FormLabel>
                  <FormControl>
                    <Input
                    type="number"
                      disabled={loading}
                      placeholder="Prix du combo meal :"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
           }
           {
            form.watch('offre') === '5' &&
            <div className='w-[81vw]' >
       <FormItem>
                  <FormLabel>Montant de la remise (en %):</FormLabel>
                  <FormControl>
                    <Input
                    type="number"
                      disabled={loading}
                      placeholder="Montant de la remise (en %):"
                      className="w-1/3"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
       
          <div className='w-[81vw] my-5'  >
          <div className='flex flex-col md:flex-row md:space-x-10 items-center' >
        <Label className='' > * Sélectionnez les jours et les plages horaires où le Happy Hour s'applique</Label>
        <DialogTrigger asChild>
        <Button>Sélectionner les heures </Button>
        </DialogTrigger>
       </div>
          </div>
          
          <div
          className='flex flex-row items-center'
          >
          <div className='w-24' ></div>
          <div className='flex-1' >
         <div className='grid grid-cols-24 gap-1' >
         {heures.map((column, id) => (
          <div key={id} className="col-span-1 text-xs font-light">
            {column}
          </div>
        ))}
         </div>
          </div>
          </div>
          {
          happyHours.map((h, i) => (
            <div
          className='flex flex-row items-center mb-3' key={i}
          >
          <div className='w-24' >
            <p> {h.jour} </p>
          </div>
          <div className='flex-1' >
         {(h?.heures?.start !== null && h?.heures?.end !== null)
           ?
           <div className='grid grid-cols-24' >
          <div className={`py-4 rounded-md bg-slate-900` } 
          style={{
            gridColumn: `span ${h?.heures?.length} / span ${h?.heures?.length}`,
            gridColumnStart: h?.heures?.start,
            //gridColumn: `span ${h?.heures?.length} / span ${h?.heures?.length}`
          }}
          ></div>
          </div>
          :
           <div className='grid grid-cols-24' >
          <div className='py-4 rounded-md bg-slate-200 col-span-24' ></div>
          </div>
         }
         </div>
          </div>
          ))
          }
          </div>
           }
           {
            form.watch('offre') === '6' &&
            <div className="grid md:grid-cols-2 gap-8" >
            <FormField
              control={form.control}
              name="remise"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>* A quelle heure souhaitez-vous démarrer l'Offre Flash? :
</FormLabel>
                  <FormControl>
                    <Input
                    type="number"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="remise"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>* Choisissez la durée en heures pour l'Offre Flash :</FormLabel>
                  <FormControl>
                    <Input
                    type="number"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
           }
           <Heading title="Les Conditions d'utilisation" description="" />
           <div className="grid md:grid-cols-2 gap-8" >
            <div className="flex flex-col space-y-2">
            <span className="text-sm">* Choisissez la durée, en jours, pendant laquelle vous souhaitez que votre offre soit affichée :</span>
            <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
            </div>
           <div className="flex flex-col space-y-2" > 
            <FormField
          control={form.control}
          name="min"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Souhaitez-vous appliquer un minimum de commande pour bénéficier de l'offre?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row space-x-3"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Oui" />
                    </FormControl>
                    <FormLabel className="font-normal">
                    Oui
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Non" />
                    </FormControl>
                    <FormLabel className="font-normal">
                    Non
                    </FormLabel>
                  </FormItem>
                 
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {
          form.watch('min') === 'Oui'
          &&
          <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Montant minimum requis pour bénéficier de l'offre</FormLabel>
                  <FormControl>
                    <Input
                    type="number"
                      disabled={loading}
                      placeholder="Montant minimum requis pour bénéficier de l'offre"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        }
            </div>
            <div className="flex flex-col space-y-2" > 
            <FormField
          control={form.control}
          name="qtyAsk"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Souhaitez-vous limiter le nombre d'offres disponibles? :</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row space-x-3"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Oui" />
                    </FormControl>
                    <FormLabel className="font-normal">
                    Oui
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Non" />
                    </FormControl>
                    <FormLabel className="font-normal">
                    Non
                    </FormLabel>
                  </FormItem>
                 
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {
          form.watch('qtyAsk') === 'Oui'
          &&
          <FormField
              control={form.control}
              name="qty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Indiquez le nombre d'offres disponibles</FormLabel>
                  <FormControl>
                    <Input
                    type="number"
                      disabled={loading}
                      placeholder="Indiquez le nombre d'offres disponibles"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        }
            </div>
            <div className="flex flex-col space-y-2" > 
            <FormField
          control={form.control}
          name="uniqueAsk"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Souhaitez-vous que l'offre soit à usage unique ou réutilisable?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row space-x-3"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={"Oui"} />
                    </FormControl>
                    <FormLabel className="font-normal">
                    A Usage Unique
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={"Non"} />
                    </FormControl>
                    <FormLabel className="font-normal">
                    Réutilisable
                    </FormLabel>
                  </FormItem>
                 
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {
          form.watch('uniqueAsk') === 'Non'
          &&
          <FormField
              control={form.control}
              name="unique"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Combien de fois l'offre peut-elle être utilisée?</FormLabel>
                  <FormControl>
                    <Input
                    type="number"
                      disabled={loading}
                      placeholder="Combien de fois l'offre peut-elle être utilisée?"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        }
            </div>
           </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
        <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Les Heures</DialogTitle>
          <DialogDescription>
          Sélectionnez les Jours et les Plages Horaires où le Happy Hour s'applique
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="">
              Jour
            </Label>
            <div className="col-span-3" >
            <Select onValueChange={val => setHinp({...hinp, jour: val})} >
      <SelectTrigger>
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select</SelectLabel>
        {
        jours.map((j: any, i: any) => (
          <SelectItem key={i} value={j} > {j} </SelectItem>
        ))
        }
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>

          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="">
              debut
            </Label>
            <div className="col-span-3" >
            <Select onValueChange={val => setHinp({...hinp, start: parseInt(val?.split(':')[0], 10)})} >
      <SelectTrigger>
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent position="item-aligned" sideOffset={5}>
        <SelectGroup>
          <SelectLabel>Select</SelectLabel>
        {
        heures.map((j: any, i: any) => (
          <SelectItem key={i} value={j} > {j} </SelectItem>
        ))
        }
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>

          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="">
              fin
            </Label>
            <div className="col-span-3" >
            <Select onValueChange={val => setHinp({...hinp, end: parseInt(val?.split(':')[0], 10)})} >
      <SelectTrigger>
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent position="item-aligned" sideOffset={5}>
        <SelectGroup>
          <SelectLabel>Select</SelectLabel>
        {
        heures.map((j: any, i: any) => (
          <SelectItem key={i} value={j} > {j} </SelectItem>
        ))
        }
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>

          </div>
        </div>
        <DialogFooter>
          <Button 
          onClick={()=> {
            setHappyHours(happyHours.map(h => h.jour === hinp.jour ? 
              {...h, heures: {start: hinp.start, end: hinp.end, length: hinp.end-hinp.start}} : h))
              console.log(happyHours)
             // close()
          }}
          >Save changes</Button>
        </DialogFooter>
      </DialogContent>
      </Form>
    </Dialog>
  );
};

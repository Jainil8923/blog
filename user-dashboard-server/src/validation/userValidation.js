import { z } from "zod";

const MAX_IMAGE_SIZE = 5000000;
const INSTAGRAM_REGEX =
  /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am|instagr.com)\/(\w+)/gim;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const FACEBOOK_REGEX =
  /(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-.]*\/)*([\w\-.]*)/;

export const userSignupSchema = z.object({
  firstname: z.string().trim().min(3),
  lastname: z.string().trim().min(3),
  email: z.string().email(),
  password: z.string().trim().min(8).regex(PASSWORD_REGEX),
});

export const userSigninSchema = z.object({
  email: z.string().email(),
  password: z.string().trim().min(8).regex(PASSWORD_REGEX),
});

export const userUpdateSchema = z.object({
  first_name: z.string().trim().min(3),
  last_name: z.string().trim().min(3),
  email: z.string().email(),
  password: z.string().trim().regex(PASSWORD_REGEX),
  content: z.string().trim().min(20),
  user_image: z
    .any()
    .refine((file) => file?.size <= MAX_IMAGE_SIZE, `Max image size is 5MB.`)
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type)),
  background_image: z
    .any()
    .refine((file) => file?.size <= MAX_IMAGE_SIZE, `Max image size is 5MB.`)
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type)),
  instagram_url: z.string().trim().regex(INSTAGRAM_REGEX),
  facebook_url: z.string().trim().regex(FACEBOOK_REGEX),
});

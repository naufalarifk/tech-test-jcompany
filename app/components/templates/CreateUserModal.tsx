"use client";

import React, { useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { createUserSchema } from "@/schemas/userSchema";
import type { User } from "@/types/user";
import { Button } from "../atoms/Button";
import { Text } from "../atoms/Text";
import toast from "react-hot-toast";

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateUserModal({ isOpen, onClose }: CreateUserModalProps) {
  const { createUser, loadingCreateUser } = useUserStore();
  const [formData, setFormData] = useState<Omit<User, "id">>({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: "",
      },
    },
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    path: string
  ) => {
    const { value } = e.target;
    setFormData((prev) => {
      const keys = path.split(".");
      const current: Record<string, unknown> = { ...prev };
      let temp: Record<string, unknown> = current;

      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        temp[key] = { ...(temp[key] as Record<string, unknown>) };
        temp = temp[key] as Record<string, unknown>;
      }

      const lastKey = keys[keys.length - 1];
      temp[lastKey] = value;
      return current as Omit<User, "id">;
    });

    if (errors[path]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[path];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSubmitError(null);

    try {
      await createUserSchema.validate(formData, { abortEarly: false });
      await createUser(formData);
      toast.success("User created successfully!");
      setFormData({
        name: "",
        username: "",
        email: "",
        phone: "",
        website: "",
        address: {
          street: "",
          suite: "",
          city: "",
          zipcode: "",
          geo: {
            lat: "",
            lng: "",
          },
        },
        company: {
          name: "",
          catchPhrase: "",
          bs: "",
        },
      });
      onClose();
    } catch (err: unknown) {
      const error = err as Record<string, unknown>;
      if (error.inner && Array.isArray(error.inner)) {
        const newErrors: Record<string, string> = {};
        (error.inner as Array<Record<string, string>>).forEach(
          (validationError) => {
            newErrors[validationError.path] = validationError.message;
          }
        );
        setErrors(newErrors);
      } else if (error instanceof Error) {
        setSubmitError(error.message || "Failed to create user");
      } else {
        setSubmitError("Failed to create user");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="modal-content bg-card rounded-lg shadow-lg border border-primary max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-header border-b border-primary px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-primary">Add New User</h2>
          <button
            onClick={onClose}
            className="hover:cursor-pointer text-secondary hover:text-primary text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {submitError && (
            <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-600 rounded p-3">
              <Text className="text-red-800 dark:text-red-200">
                {submitError}
              </Text>
            </div>
          )}

          <fieldset className="space-y-4">
            <legend className="text-lg font-semibold text-primary mb-3">
              Basic Information
            </legend>

            <div>
              <label className="block text-sm font-medium text-primary mb-1">
                Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange(e, "name")}
                className="w-full px-4 py-2 border border-primary rounded-lg bg-primary text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-black"
                placeholder="Full name"
              />
              {errors.name && (
                <Text className="text-red-600 dark:text-red-400 text-sm mt-1">
                  {errors.name}
                </Text>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1">
                Username <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange(e, "username")}
                className="w-full px-4 py-2 border border-primary rounded-lg bg-primary text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-black"
                placeholder="Username"
              />
              {errors.username && (
                <Text className="text-red-600 dark:text-red-400 text-sm mt-1">
                  {errors.username}
                </Text>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1">
                Email <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange(e, "email")}
                className="w-full px-4 py-2 border border-primary rounded-lg bg-primary text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-black"
                placeholder="email@example.com"
              />
              {errors.email && (
                <Text className="text-red-600 dark:text-red-400 text-sm mt-1">
                  {errors.email}
                </Text>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1">
                Phone <span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange(e, "phone")}
                className="w-full px-4 py-2 border border-primary rounded-lg bg-primary text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-black"
                placeholder="+1 (555) 000-0000"
              />
              {errors.phone && (
                <Text className="text-red-600 dark:text-red-400 text-sm mt-1">
                  {errors.phone}
                </Text>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1">
                Website <span className="text-red-600">*</span>
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => handleInputChange(e, "website")}
                className="w-full px-4 py-2 border border-primary rounded-lg bg-primary text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-black"
                placeholder="https://example.com"
              />
              {errors.website && (
                <Text className="text-red-600 dark:text-red-400 text-sm mt-1">
                  {errors.website}
                </Text>
              )}
            </div>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="text-lg font-semibold text-primary mb-3">
              Address
            </legend>

            <div>
              <label className="block text-sm font-medium text-primary mb-1">
                Street <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={formData.address.street}
                onChange={(e) => handleInputChange(e, "address.street")}
                className="w-full px-4 py-2 border border-primary rounded-lg bg-primary text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-black"
                placeholder="Street address"
              />
              {errors["address.street"] && (
                <Text className="text-red-600 dark:text-red-400 text-sm mt-1">
                  {errors["address.street"]}
                </Text>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1">
                Suite/Apartment <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={formData.address.suite}
                onChange={(e) => handleInputChange(e, "address.suite")}
                className="w-full px-4 py-2 border border-primary rounded-lg bg-primary text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-black"
                placeholder="Apt, Suite, etc."
              />
              {errors["address.suite"] && (
                <Text className="text-red-600 dark:text-red-400 text-sm mt-1">
                  {errors["address.suite"]}
                </Text>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-1">
                  City <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.address.city}
                  onChange={(e) => handleInputChange(e, "address.city")}
                  className="w-full px-4 py-2 border border-primary rounded-lg bg-primary text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-black"
                  placeholder="City"
                />
                {errors["address.city"] && (
                  <Text className="text-red-600 dark:text-red-400 text-sm mt-1">
                    {errors["address.city"]}
                  </Text>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-1">
                  Zipcode <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.address.zipcode}
                  onChange={(e) => handleInputChange(e, "address.zipcode")}
                  className="w-full px-4 py-2 border border-primary rounded-lg bg-primary text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-black"
                  placeholder="12345"
                />
                {errors["address.zipcode"] && (
                  <Text className="text-red-600 dark:text-red-400 text-sm mt-1">
                    {errors["address.zipcode"]}
                  </Text>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-1">
                  Latitude <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.address.geo.lat}
                  onChange={(e) => handleInputChange(e, "address.geo.lat")}
                  className="w-full px-4 py-2 border border-primary rounded-lg bg-primary text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-black"
                  placeholder="40.7128"
                />
                {errors["address.geo.lat"] && (
                  <Text className="text-red-600 dark:text-red-400 text-sm mt-1">
                    {errors["address.geo.lat"]}
                  </Text>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-1">
                  Longitude <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.address.geo.lng}
                  onChange={(e) => handleInputChange(e, "address.geo.lng")}
                  className="w-full px-4 py-2 border border-primary rounded-lg bg-primary text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-black"
                  placeholder="-74.0060"
                />
                {errors["address.geo.lng"] && (
                  <Text className="text-red-600 dark:text-red-400 text-sm mt-1">
                    {errors["address.geo.lng"]}
                  </Text>
                )}
              </div>
            </div>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="text-lg font-semibold text-primary mb-3">
              Company Information
            </legend>

            <div>
              <label className="block text-sm font-medium text-primary mb-1">
                Company Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={formData.company.name}
                onChange={(e) => handleInputChange(e, "company.name")}
                className="w-full px-4 py-2 border border-primary rounded-lg bg-primary text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-black"
                placeholder="Company name"
              />
              {errors["company.name"] && (
                <Text className="text-red-600 dark:text-red-400 text-sm mt-1">
                  {errors["company.name"]}
                </Text>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1">
                Catch Phrase <span className="text-red-600">*</span>
              </label>
              <textarea
                value={formData.company.catchPhrase}
                onChange={(e) => handleInputChange(e, "company.catchPhrase")}
                className="w-full px-4 py-2 border border-primary rounded-lg bg-primary text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-black resize-none"
                placeholder="Company catch phrase"
                rows={2}
              />
              {errors["company.catchPhrase"] && (
                <Text className="text-red-600 dark:text-red-400 text-sm mt-1">
                  {errors["company.catchPhrase"]}
                </Text>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1">
                Business Segment <span className="text-red-600">*</span>
              </label>
              <textarea
                value={formData.company.bs}
                onChange={(e) => handleInputChange(e, "company.bs")}
                className="w-full px-4 py-2 border border-primary rounded-lg bg-primary text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-black resize-none"
                placeholder="Business segment"
                rows={2}
              />
              {errors["company.bs"] && (
                <Text className="text-red-600 dark:text-red-400 text-sm mt-1">
                  {errors["company.bs"]}
                </Text>
              )}
            </div>
          </fieldset>

          <div className="flex gap-4 justify-end pt-4 border-t border-primary">
            <Button
              variant="secondary"
              onClick={onClose}
              disabled={loadingCreateUser}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={loadingCreateUser}
            >
              {loadingCreateUser ? "Creating..." : "Create User"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

package com.example.eating;

import lombok.Getter;

@Getter
public class APIResponse<T> {
    private String message;
    private T recipe;

    public APIResponse(String message, T recipe) {
        this.message = message;
        this.recipe = recipe;
    }

    public static <T> APIResponse<T> success(String message, T recipe) {
        return new APIResponse<>(message, recipe);
    }

    public static <T> APIResponse<T> fail(String message) {
        return new APIResponse<>(message, null);
    }
}

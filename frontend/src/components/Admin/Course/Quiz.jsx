import React from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Quiz = ({form, questions}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Quiz</CardTitle>
        <CardDescription>
          Create a quiz with 10 multiple choice questions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="timeLimit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time Limit (minutes)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={5}
                  placeholder="30"
                  {...field}
                  onChange={(e) =>
                    field.onChange(Number.parseInt(e.target.value))
                  }
                />
              </FormControl>
              <FormDescription>Set a time limit for the quiz</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-6">
          {questions.map((_, index) => (
            <div key={index} className="rounded-lg border p-4">
              <FormField
                control={form.control}
                name={`quiz.${index}.question`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question {index + 1}</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your question" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mt-4 space-y-4">
                {[0, 1, 2, 3].map((optionIndex) => (
                  <div key={optionIndex} className="flex items-center gap-2">
                    <FormField
                      control={form.control}
                      name={`quiz.${index}.options.${optionIndex}`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <div className="flex items-center gap-2">
                              <Input
                                placeholder={`Option ${optionIndex + 1}`}
                                {...field}
                              />
                              <FormField
                                control={form.control}
                                name={`quiz.${index}.correctAnswer`}
                                render={({ field: radioField }) => (
                                  <FormItem>
                                    <FormControl>
                                      <RadioGroup
                                        onValueChange={(value) =>
                                          radioField.onChange(
                                            Number.parseInt(value)
                                          )
                                        }
                                        value={(radioField.value ?? 0).toString()}
                                      >
                                        <RadioGroupItem
                                          value={optionIndex.toString()}
                                        />
                                      </RadioGroup>
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Quiz;

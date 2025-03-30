"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { Slider } from "./ui/slider";
import { usePreference } from "@/context/preferenceContex";

export default function PreferenceDialogue() {
  const { preference, setPreference } = usePreference();

  // State for each preference field
  const [wordLength, setWordLength] = useState(preference.WordLength);
  const [tone, setTone] = useState(preference.Tone);
  const [complexity, setComplexity] = useState(preference.Complexity);
  const [writingStyle, setWritingStyle] = useState<string[]>(
    preference.WritingStyle
  );
  const [formattingPreferences, setFormattingPreferences] = useState<string[]>(
    preference.FormattingPreferences
  );
  const [aiCreativityLevel, setAiCreativityLevel] = useState("");

  const handleSavePreferences = () => {
    setPreference({
      Tone: tone,
      WordLength: wordLength,
      WritingStyle: writingStyle,
      Complexity: complexity,
      FormattingPreferences: formattingPreferences,
      AICreativityLevel: aiCreativityLevel,
    });

    console.log(preference);
  };

  return (
    <ScrollArea className="w-[50vw] h-[85vh] rounded-lg border p-10 shadow-md bg-slate-800">
      <div className="space-y-6">
        {/* Tone */}
        <Card className="shadow-sm border">
          <CardContent className="p-5 space-y-3">
            <h3 className="font-semibold text-lg">Tone</h3>
            <Select
              value={preference.Tone}
              onValueChange={(value) => {
                setTone(value);
                setPreference((prev) => ({ ...prev, Tone: value }));
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select tone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="academic">Academic</SelectItem>
                <SelectItem value="creative">Creative</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Word Length */}
        <Card className="shadow-sm border">
          <CardContent className="p-5 space-y-3">
            <h3 className="font-semibold text-lg">Word Length</h3>
            <p className="text-sm text-gray-600">{wordLength}</p>
            <Slider
              value={[wordLength]}
              onValueChange={(value) => {
                const newValue = value[0];
                setWordLength(newValue);
                setPreference((prev) => ({ ...prev, WordLength: newValue }));
              }}
              min={50}
              max={10000}
              step={50}
            />
          </CardContent>
        </Card>

        {/* Writing Style */}
        <Card className="shadow-sm border">
          <CardContent className="p-5 space-y-3">
            <h3 className="font-semibold text-lg">Writing Style</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                "Detailed & descriptive",
                "Persuasive & emotional",
                "Informative & neutral",
                "Poetic & creative",
              ].map((style, index) => (
                <label key={index} className="flex items-center space-x-2">
                  <Checkbox
                    checked={writingStyle.includes(style)}
                    onCheckedChange={(checked) => {
                      const updatedStyles = checked
                        ? [...writingStyle, style]
                        : writingStyle.filter((s) => s !== style);

                      setWritingStyle(updatedStyles);
                      setPreference((prev) => ({
                        ...prev,
                        WritingStyle: updatedStyles,
                      }));
                    }}
                  />
                  <span className="text-sm">{style}</span>
                </label>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Complexity */}
        <Card className="shadow-sm border">
          <CardContent className="p-5 space-y-3">
            <h3 className="font-semibold text-lg">Complexity</h3>
            <Select
              value={complexity || preference.Complexity} // Initialize from context
              onValueChange={(value) => {
                setComplexity(value); // Update local state
                setPreference((prev) => ({
                  ...prev,
                  Complexity: value, // Persist in context
                }));
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select complexity level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="simple">Simple</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Formatting Preferences */}
        <Card className="shadow-sm border">
          <CardContent className="p-5 space-y-3">
            <h3 className="font-semibold text-lg">Formatting Preferences</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                "Bullet points & structured lists",
                "Paragraph-heavy prose",
                "Headings & subheadings",
                "Citation style (APA, MLA, IEEE, etc.)",
              ].map((format, index) => (
                <label key={index} className="flex items-center space-x-2">
                  <Checkbox
                    checked={
                      formattingPreferences.includes(format) ||
                      preference.FormattingPreferences.includes(format)
                    }
                    onCheckedChange={(checked) => {
                      const newPreferences = checked
                        ? [...formattingPreferences, format]
                        : formattingPreferences.filter((f) => f !== format);

                      setFormattingPreferences(newPreferences);
                      setPreference((prev) => ({
                        ...prev,
                        FormattingPreferences: newPreferences,
                      }));
                    }}
                  />
                  <span className="text-sm">{format}</span>
                </label>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Creativity Level */}
        <Card className="shadow-sm border">
          <CardContent className="p-5 space-y-3">
            <h3 className="font-semibold text-lg">AI Creativity Level</h3>
            <RadioGroup
              value={preference.AICreativityLevel || ""}
              onValueChange={(value) => {
                setAiCreativityLevel(value);
                setPreference((prev) => ({
                  ...prev,
                  AICreativityLevel: value, // Ensure key name matches
                }));
              }}
              className="space-y-2"
            >
              {["Strictly factual", "Mildly creative", "Highly creative"].map(
                (level, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={level} id={level} />
                    <label htmlFor={level} className="text-sm">
                      {level}
                    </label>
                  </div>
                )
              )}
            </RadioGroup>
          </CardContent>
        </Card>

        <Separator />

        {/* Save Preferences Button */}
        <div className="flex justify-center pt-4">
          <Button className="w-1/3" onClick={handleSavePreferences}>
            Save Preferences
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
}

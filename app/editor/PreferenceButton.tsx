"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { usePreference } from "@/context/preferenceContex";
import { CircleAlert } from "lucide-react";
import { Dialog, DialogTrigger, DialogOverlay, DialogContent, DialogTitle } from "@/components/ui/dialog";

export default function PreferenceButton() {
  const { preference, setPreference } = usePreference();

  const [wordLength, setWordLength] = useState(preference.WordLength);
  const [tone, setTone] = useState(preference.Tone);
  const [complexity, setComplexity] = useState(preference.Complexity);
  const [writingStyle, setWritingStyle] = useState(preference.WritingStyle);
  const [formattingPreferences, setFormattingPreferences] = useState(preference.FormattingPreferences);
  const [aiCreativityLevel, setAiCreativityLevel] = useState("");
  const [open, setOpen] = useState(false);

  const handleSavePreferences = () => {
    setPreference({
      Tone: tone,
      WordLength: wordLength,
      WritingStyle: writingStyle,
      Complexity: complexity,
      FormattingPreferences: formattingPreferences,
      AICreativityLevel: aiCreativityLevel,
    });
    setOpen(false);
  };
  const clearPreference = () => {
    setPreference({
      Tone: "",
      WordLength: 0,
      WritingStyle: [""],
      Complexity: "",
      FormattingPreferences: [""],
      AICreativityLevel: "",
    });
    setTone("");
    setWordLength(0);
    setComplexity("");
    setWritingStyle([""]);
    setFormattingPreferences([""]);
    setAiCreativityLevel("");
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-md">
            <CircleAlert size={18} />
            Preferences
          </Button>
        </DialogTrigger>
        <DialogOverlay className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40" />
        <DialogContent className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 border border-white/10 backdrop-blur-lg shadow-xl rounded-2xl p-6 text-white">
          <DialogTitle>Preferences</DialogTitle>
          <div>
            <ScrollArea className="w-full h-[500px] p-3 rounded-lg">
              <div className="space-y-6">
                {/* Tone */}
                <Card className="bg-[#1e293b] border border-white/10 shadow-inner shadow-black/20">
                  <CardContent className="p-5 space-y-3">
                    <h3 className="font-semibold text-lg text-white">Tone</h3>
                    <Select
                      value={tone}
                      onValueChange={(value) => {
                        setTone(value);
                        setPreference((prev) => ({ ...prev, Tone: value }));
                      }}
                    >
                      <SelectTrigger className="bg-[#0f172a] border-white/10 text-white">
                        <SelectValue placeholder="Select tone" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1e293b] text-white border-white/10">
                        {["casual", "professional", "academic", "creative"].map((val) => (
                          <SelectItem key={val} value={val}>
                            {val.charAt(0).toUpperCase() + val.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>

                {/* Word Length */}
                <Card className="bg-[#1e293b] border border-white/10">
                  <CardContent className="p-5 space-y-3">
                    <h3 className="font-semibold text-lg text-white">Word Length</h3>
                    <p className="text-sm text-gray-400">{wordLength}</p>
                    <Slider
                      value={[wordLength]}
                      onValueChange={(value) => {
                        const newValue = value[0];
                        setWordLength(newValue);
                        setPreference((prev) => ({
                          ...prev,
                          WordLength: newValue,
                        }));
                      }}
                      min={50}
                      max={10000}
                      step={50}
                    />
                  </CardContent>
                </Card>

                {/* Writing Style */}
                <Card className="bg-[#1e293b] border border-white/10">
                  <CardContent className="p-5 space-y-3">
                    <h3 className="font-semibold text-lg text-white">Writing Style</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {["Detailed & descriptive", "Persuasive & emotional", "Informative & neutral", "Poetic & creative"].map((style) => (
                        <label key={style} className="flex items-center space-x-2">
                          <Checkbox
                            checked={writingStyle.includes(style)}
                            onCheckedChange={(checked) => {
                              const updatedStyles = checked ? [...writingStyle, style] : writingStyle.filter((s) => s !== style);

                              setWritingStyle(updatedStyles);
                              setPreference((prev) => ({
                                ...prev,
                                WritingStyle: updatedStyles,
                              }));
                            }}
                          />
                          <span className="text-sm text-white">{style}</span>
                        </label>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Complexity */}
                <Card className="bg-[#1e293b] border border-white/10">
                  <CardContent className="p-5 space-y-3">
                    <h3 className="font-semibold text-lg text-white">Complexity</h3>
                    <Select
                      value={complexity}
                      onValueChange={(value) => {
                        setComplexity(value);
                        setPreference((prev) => ({
                          ...prev,
                          Complexity: value,
                        }));
                      }}
                    >
                      <SelectTrigger className="bg-[#0f172a] border-white/10 text-white">
                        <SelectValue placeholder="Select complexity level" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1e293b] text-white border-white/10">
                        <SelectItem value="simple">Simple</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>

                {/* Formatting Preferences */}
                <Card className="bg-[#1e293b] border border-white/10">
                  <CardContent className="p-5 space-y-3">
                    <h3 className="font-semibold text-lg text-white">Formatting Preferences</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {["Bullet points & structured lists", "Paragraph-heavy prose", "Headings & subheadings", "Citation style (APA, MLA, IEEE, etc.)"].map((format) => (
                        <label key={format} className="flex items-center space-x-2">
                          <Checkbox
                            checked={formattingPreferences.includes(format) || preference.FormattingPreferences.includes(format)}
                            onCheckedChange={(checked) => {
                              const newPreferences = checked ? [...formattingPreferences, format] : formattingPreferences.filter((f) => f !== format);

                              setFormattingPreferences(newPreferences);
                              setPreference((prev) => ({
                                ...prev,
                                FormattingPreferences: newPreferences,
                              }));
                            }}
                          />
                          <span className="text-sm text-white">{format}</span>
                        </label>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* AI Creativity Level */}
                <Card className="bg-[#1e293b] border border-white/10">
                  <CardContent className="p-5 space-y-3">
                    <h3 className="font-semibold text-lg text-white">AI Creativity Level</h3>
                    <RadioGroup
                      value={preference.AICreativityLevel || ""}
                      onValueChange={(value) => {
                        setAiCreativityLevel(value);
                        setPreference((prev) => ({
                          ...prev,
                          AICreativityLevel: value,
                        }));
                      }}
                      className="space-y-2"
                    >
                      {["Strictly factual", "Mildly creative", "Highly creative"].map((level) => (
                        <div key={level} className="flex items-center space-x-2">
                          <RadioGroupItem value={level} id={level} />
                          <label htmlFor={level} className="text-sm text-white">
                            {level}
                          </label>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>

                <Separator className="bg-white/10" />

                {/* Save Button */}
                <div className="flex justify-evenly pt-2">
                  <Button variant="destructive" className="w-1/3 font-semibold rounded-xl shadow-lg" onClick={clearPreference}>
                    Clear Preferences
                  </Button>
                  <Button className="w-1/3 bg-gradient-to-br from-purple-600 to-indigo-600 hover:brightness-110 text-white font-semibold rounded-xl shadow-lg" onClick={handleSavePreferences}>
                    Save Preferences
                  </Button>
                </div>
              </div>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

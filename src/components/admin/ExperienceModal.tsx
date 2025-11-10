import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useMutation } from "@apollo/client/react";
import { CREATE_EXPERIENCE, UPDATE_EXPERIENCE, DELETE_EXPERIENCE } from "@/graphql/mutations/experiences";
import { useSkills } from "@/hooks/useSkills";
import type { Experience } from "@/types/portfolio.types";

interface ExperienceModalProps {
  experience?: Experience | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const ExperienceModal = ({ experience, isOpen, onClose, onSuccess }: ExperienceModalProps) => {
  const { data: skillsData } = useSkills();
  const [createExperience, { loading: creating }] = useMutation(CREATE_EXPERIENCE);
  const [updateExperience, { loading: updating }] = useMutation(UPDATE_EXPERIENCE);
  const [deleteExperience, { loading: deleting }] = useMutation(DELETE_EXPERIENCE);

  const [formData, setFormData] = useState({
    position: "",
    company: "",
    companyUrl: "",
    location: "",
    employmentType: "full_time",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
    responsibilities: [""],
    achievements: [""],
    skillIds: [] as string[]
  });

  useEffect(() => {
    if (experience) {
      setFormData({
        position: experience.position || "",
        company: experience.company || "",
        companyUrl: experience.companyUrl || "",
        location: experience.location || "",
        employmentType: experience.employmentType || "full_time",
        startDate: experience.startDate ? new Date(parseInt(experience.startDate)).toISOString().split('T')[0] : "",
        endDate: experience.endDate ? new Date(parseInt(experience.endDate)).toISOString().split('T')[0] : "",
        current: experience.current || false,
        description: experience.description || "",
        responsibilities: experience.responsibilities || [""],
        achievements: experience.achievements || [""],
        skillIds: experience.skills?.map(s => s?.id).filter(Boolean) || []
      });
    } else {
      setFormData({
        position: "",
        company: "",
        companyUrl: "",
        location: "",
        employmentType: "full_time",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
        responsibilities: [""],
        achievements: [""],
        skillIds: []
      });
    }
  }, [experience, isOpen]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const input = {
        ...formData,
        startDate: new Date(formData.startDate).getTime().toString(),
        endDate: formData.current ? null : new Date(formData.endDate).getTime().toString(),
        responsibilities: formData.responsibilities.filter(r => r.trim()),
        achievements: formData.achievements.filter(a => a.trim())
      };

      if (experience) {
        await updateExperience({ variables: { id: experience.id, input } });
      } else {
        await createExperience({ variables: { input } });
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to save experience:", error);
    }
  };

  const handleDelete = async () => {
    if (!experience || !confirm("Are you sure you want to delete this experience?")) return;
    try {
      await deleteExperience({ variables: { id: experience.id } });
      onSuccess();
      onClose();
    } catch {
      console.error("Failed to delete experience");
    }
  };

  const handleArrayChange = (field: "responsibilities" | "achievements", index: number, value: string) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayItem = (field: "responsibilities" | "achievements") => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const removeArrayItem = (field: "responsibilities" | "achievements", index: number) => {
    setFormData({ ...formData, [field]: formData[field].filter((_, i) => i !== index) });
  };

  const toggleSkill = (skillId: string) => {
    setFormData({
      ...formData,
      skillIds: formData.skillIds.includes(skillId)
        ? formData.skillIds.filter(id => id !== skillId)
        : [...formData.skillIds, skillId]
    });
  };

  if (!isOpen) return null;

  const skills = skillsData?.skills || [];
  const loading = creating || updating || deleting;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 border border-purple-500/20 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-slate-800 border-b border-purple-500/20 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            {experience ? "Edit Experience" : "Create Experience"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-purple-300 mb-2">Position</label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900/50 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-purple-300 mb-2">Company</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900/50 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-500"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-purple-300 mb-2">Company URL</label>
              <input
                type="url"
                value={formData.companyUrl}
                onChange={(e) => setFormData({ ...formData, companyUrl: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900/50 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-500"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-purple-300 mb-2">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900/50 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-purple-300 mb-2">Employment Type</label>
              <select
                value={formData.employmentType}
                onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900/50 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-500"
              >
                <option value="full_time">Full-time</option>
                <option value="part_time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="freelance">Freelance</option>
                <option value="internship">Internship</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-purple-300 mb-2">Start Date</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900/50 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-purple-300 mb-2">End Date</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                disabled={formData.current}
                className="w-full px-4 py-3 bg-slate-900/50 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-500 disabled:opacity-50"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.current}
                onChange={(e) => setFormData({ ...formData, current: e.target.checked })}
                className="w-5 h-5 rounded bg-slate-900 border-purple-500/30"
              />
              <span className="text-purple-300">Currently working here</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-300 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-slate-900/50 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-500 resize-none"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-purple-300">Responsibilities</label>
              <button type="button" onClick={() => addArrayItem("responsibilities")} className="text-sm text-purple-400">+ Add</button>
            </div>
            <div className="space-y-2">
              {formData.responsibilities.map((resp, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={resp}
                    onChange={(e) => handleArrayChange("responsibilities", index, e.target.value)}
                    className="flex-1 px-4 py-3 bg-slate-900/50 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-500"
                    placeholder="Responsibility..."
                  />
                  {formData.responsibilities.length > 1 && (
                    <button type="button" onClick={() => removeArrayItem("responsibilities", index)} className="px-4 text-red-400">✕</button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-purple-300">Achievements</label>
              <button type="button" onClick={() => addArrayItem("achievements")} className="text-sm text-purple-400">+ Add</button>
            </div>
            <div className="space-y-2">
              {formData.achievements.map((ach, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={ach}
                    onChange={(e) => handleArrayChange("achievements", index, e.target.value)}
                    className="flex-1 px-4 py-3 bg-slate-900/50 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-500"
                    placeholder="Achievement..."
                  />
                  {formData.achievements.length > 1 && (
                    <button type="button" onClick={() => removeArrayItem("achievements", index)} className="px-4 text-red-400">✕</button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-300 mb-2">Skills</label>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <button
                  key={skill?.id}
                  type="button"
                  onClick={() => toggleSkill(skill?.id || "")}
                  className={`px-4 py-2 rounded-xl text-sm transition-colors ${
                    formData.skillIds.includes(skill?.id || "")
                      ? "bg-purple-500 text-white"
                      : "bg-slate-900/50 text-gray-400 border border-purple-500/30"
                  }`}
                >
                  {skill?.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-purple-500/20">
            {experience && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="px-6 py-3 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-colors border border-red-500/30 disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            )}
            <div className="flex gap-3 ml-auto">
              <button type="button" onClick={onClose} className="px-6 py-3 bg-slate-700/50 text-gray-300 rounded-xl hover:bg-slate-700 transition-colors">
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50"
              >
                {loading ? "Saving..." : experience ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

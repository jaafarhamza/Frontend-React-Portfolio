import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useMutation } from "@apollo/client/react";
import { CREATE_SKILL, UPDATE_SKILL, DELETE_SKILL } from "@/graphql/mutations/skills";
import type { Skill } from "@/types/portfolio.types";

interface SkillModalProps {
  skill?: Skill | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const SkillModal = ({ skill, isOpen, onClose, onSuccess }: SkillModalProps) => {
  const [createSkill, { loading: creating }] = useMutation(CREATE_SKILL);
  const [updateSkill, { loading: updating }] = useMutation(UPDATE_SKILL);
  const [deleteSkill, { loading: deleting }] = useMutation(DELETE_SKILL);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    level: 3
  });

  useEffect(() => {
    if (skill) {
      setFormData({
        name: skill.name || "",
        category: skill.category || "",
        level: skill.level || 3
      });
    } else {
      setFormData({ name: "", category: "", level: 3 });
    }
  }, [skill, isOpen]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (skill) {
        await updateSkill({ variables: { id: skill.id, input: formData } });
      } else {
        await createSkill({ variables: { input: formData } });
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to save skill:", error);
      alert("Failed to save skill. Check console for details.");
    }
  };

  const handleDelete = async () => {
    if (!skill || !confirm("Are you sure you want to delete this skill?")) return;
    try {
      await deleteSkill({ variables: { id: skill.id } });
      onSuccess();
      onClose();
    } catch {
      console.error("Failed to delete skill");
    }
  };

  if (!isOpen) return null;

  const loading = creating || updating || deleting;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 border border-purple-500/20 rounded-2xl max-w-md w-full">
        <div className="border-b border-purple-500/20 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            {skill ? "Edit Skill" : "Create Skill"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-purple-300 mb-2">Skill Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-slate-900/50 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-300 mb-2">Category</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 bg-slate-900/50 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-500"
              placeholder="e.g., Frontend, Backend, DevOps"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-300 mb-2">
              Proficiency Level: {formData.level}/5
            </label>
            <input
              type="range"
              min="1"
              max="5"
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
              className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1 - Beginner</span>
              <span>5 - Expert</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-purple-500/20">
            {skill && (
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
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-slate-700/50 text-gray-300 rounded-xl hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50"
              >
                {loading ? "Saving..." : skill ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

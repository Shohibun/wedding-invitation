import {
  CreateTemplateDTO,
  NotificationTemplateV2,
  NotificationVariable,
  TemplatePreview,
  UpdateTemplateDTO,
} from "./types";
import { templateRepository } from "./repository";
import { TemplateValidator } from "./validator";
import { TemplateCompiler } from "./compiler";
import { PreviewEngine } from "./preview";
import { DEFAULT_TEMPLATE_VARIABLES } from "./defaults";

export const TemplateService = {
  async createTemplate(data: CreateTemplateDTO): Promise<NotificationTemplateV2> {
    // For automatic detection, we could parse the body and auto-assign default variables
    const compilerMock: NotificationTemplateV2 = {
      id: "mock",
      name: data.name,
      channel: data.channel,
      body: data.body,
      subject: data.subject,
      variables: DEFAULT_TEMPLATE_VARIABLES,
      version: 1,
      createdAt: "",
      updatedAt: "",
    };

    const compiled = TemplateCompiler.compile(compilerMock);

    // Auto-detect and build variable definitions based on used required variables
    const detectedVariables: NotificationVariable[] = compiled.requiredVariables.map((key) => {
      const def = DEFAULT_TEMPLATE_VARIABLES.find((d) => d.key === key);
      return def || { key, label: key, description: "Custom variable", required: true };
    });

    return templateRepository.createTemplate(data, detectedVariables);
  },

  async updateTemplate(id: string, data: UpdateTemplateDTO): Promise<NotificationTemplateV2> {
    return templateRepository.updateTemplate(id, data);
  },

  async previewTemplate(id: string, variables: Record<string, string>): Promise<TemplatePreview> {
    const template = await templateRepository.findTemplateById(id);
    if (!template) throw new Error("Template not found");

    return PreviewEngine.generate(template, variables);
  },

  async validateTemplate(template: NotificationTemplateV2): Promise<void> {
    TemplateValidator.validateSchema(template);
    TemplateCompiler.compile(template); // Throws if parsing fails
  },
};
